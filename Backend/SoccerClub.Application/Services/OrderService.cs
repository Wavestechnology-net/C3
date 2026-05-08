using AutoMapper;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using SoccerClub.Core.Entities;
using SoccerClub.Core.Interfaces;
using SoccerClub.Application.DTOs;
using SoccerClub.Application.Interfaces;
using Stripe;
using Stripe.Checkout;

namespace SoccerClub.Application.Services
{
    public class OrderService : IOrderService
    {
        private readonly IGenericRepository<Order> _orderRepo;
        private readonly IGenericRepository<OrderItem> _orderItemRepo;
        private readonly IGenericRepository<Core.Entities.Product> _productRepo;
        private readonly IMapper _mapper;
        private readonly IConfiguration _config;
        private readonly ILogger<OrderService> _logger;

        public OrderService(
            IGenericRepository<Order> orderRepo,
            IGenericRepository<OrderItem> orderItemRepo,
            IGenericRepository<Core.Entities.Product> productRepo,
            IMapper mapper,
            IConfiguration config,
            ILogger<OrderService> logger)
        {
            _orderRepo = orderRepo;
            _orderItemRepo = orderItemRepo;
            _productRepo = productRepo;
            _mapper = mapper;
            _config = config;
            _logger = logger;

            StripeConfiguration.ApiKey = _config["Stripe:SecretKey"];
        }

        // 🛒 CREATE CHECKOUT
        public async Task<string> CreateCheckoutSessionAsync(CheckoutRequestDTO request)
        {
            _logger.LogInformation("Checkout started for {Email}", request.UserEmail);

            try
            {
                var lineItems = new List<SessionLineItemOptions>();
                decimal total = 0;

                foreach (var item in request.Items)
                {
                    var product = await _productRepo.GetByIdAsync(item.ProductId);

                    if (product == null)
                        throw new Exception($"Product not found: {item.ProductId}");

                    total += product.Price * item.Quantity;

                    lineItems.Add(new SessionLineItemOptions
                    {
                        Quantity = item.Quantity,
                        PriceData = new SessionLineItemPriceDataOptions
                        {
                            Currency = "usd",
                            UnitAmount = (long)(product.Price * 100),
                            ProductData = new SessionLineItemPriceDataProductDataOptions
                            {
                                Name = product.Name
                            }
                        }
                    });
                }

                var options = new SessionCreateOptions
                {
                    PaymentMethodTypes = new List<string> { "card" },
                    LineItems = lineItems,
                    Mode = "payment",
                    //SuccessUrl = "https://c3fcsoccer.com/success",
                    //CancelUrl = "https://c3fcsoccer.com/cancel"
                    SuccessUrl = "http://localhost:5173/success",
                    CancelUrl = "http://localhost:5173/cancel"
                };

                var service = new SessionService();
                var session = service.Create(options);

                var order = new Order
                {
                    UserEmail = request.UserEmail,
                    TotalAmount = total,
                    StripeSessionId = session.Id,
                    Status = "Pending",
                    CreatedAt = DateTime.UtcNow
                };

                await _orderRepo.AddAsync(order);

                Console.WriteLine(order.OrderId);

                foreach (var item in request.Items)
                {
                    var product = await _productRepo.GetByIdAsync(item.ProductId);

                    if (product == null)
                        continue;

                    var orderItem = new OrderItem
                    {
                        OrderId = order.OrderId,
                        ProductId = product.ProductId,
                        Quantity = item.Quantity,
                        Size = item.Size,
                        Price = product.Price,

                        IsActive = true,
                        CreatedAt = DateTime.UtcNow
                    };

                    await _orderItemRepo.AddAsync(orderItem);
                }

                _logger.LogInformation("Order created: {SessionId}", session.Id);

                return session.Url;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Checkout failed");
                throw;
            }
        }

        // 📦 GET ALL ORDERS
        public async Task<IEnumerable<OrderDTO>> GetAllOrdersAsync()
        {
            var orders = await _orderRepo.GetAllAsync();

            return _mapper.Map<IEnumerable<OrderDTO>>(orders);
        }

        // 📦 GET BY ID
        public async Task<OrderDTO?> GetOrderByIdAsync(int id)
        {
            var order = await _orderRepo.GetByIdAsync(id);

            if (order == null) return null;

            return _mapper.Map<OrderDTO>(order);
        }

        // 🔄 UPDATE STATUS
        public async Task<object> UpdateOrderStatusAsync(int id, string status)
        {
            var order = await _orderRepo.GetByIdAsync(id);

            if (order == null)
                throw new Exception("Order not found");

            order.Status = status;

            await _orderRepo.UpdateAsync(order);

            return new
            {
                Success = true,
                Message = "Status updated"
            };
        }

        // 🔔 WEBHOOK (STRIPE)
        public async Task HandleStripeWebhookAsync(string json, string signature)
        {
            try
            {
                var stripeEvent = EventUtility.ConstructEvent(
                    json,
                    signature,
                    _config["Stripe:WebhookSecret"]
                );

                if (stripeEvent.Type == "checkout.session.completed")
                {
                    var session = stripeEvent.Data.Object as Session;

                    var orders = await _orderRepo.FindAsync(o =>
                        o.StripeSessionId == session.Id
                    );

                    var order = orders.FirstOrDefault();

                    if (order != null)
                    {
                        order.Status = "Paid";

                        await _orderRepo.UpdateAsync(order);

                        _logger.LogInformation("Order marked Paid: {Id}", order.OrderId);
                    }
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Webhook error");
                throw;
            }
        }
    }
}