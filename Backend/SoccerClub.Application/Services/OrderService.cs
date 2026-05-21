using AutoMapper;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using SoccerClub.Core.Entities;
using SoccerClub.Core.Interfaces;
using SoccerClub.Application.DTOs;
using SoccerClub.Application.Interfaces;
using Microsoft.AspNetCore.Http;
using Stripe;
using Stripe.Checkout;
using System.Security.Claims;

namespace SoccerClub.Application.Services
{
    public class OrderService : IOrderService
    {
        private readonly IGenericRepository<Order> _orderRepo;
        private readonly IGenericRepository<OrderItem> _orderItemRepo;
        private readonly IGenericRepository<Core.Entities.Product> _productRepo;
        private readonly IGenericRepository<User> _userRepo;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IMapper _mapper;
        private readonly IConfiguration _config;
        private readonly ILogger<OrderService> _logger;

        public OrderService(
            IGenericRepository<Order> orderRepo,
            IGenericRepository<OrderItem> orderItemRepo,
            IGenericRepository<Core.Entities.Product> productRepo,
            IGenericRepository<User> userRepo,
            IHttpContextAccessor httpContextAccessor,
            IMapper mapper,
            IConfiguration config,
            ILogger<OrderService> logger)
        {
            _orderRepo = orderRepo;
            _orderItemRepo = orderItemRepo;
            _productRepo = productRepo;
            _userRepo = userRepo;
            _httpContextAccessor = httpContextAccessor;
            _mapper = mapper;
            _config = config;
            _logger = logger;

            StripeConfiguration.ApiKey = _config["Stripe:SecretKey"];
        }

        // 🛒 CREATE CHECKOUT
        public async Task<string> CreateCheckoutSessionAsync(CheckoutRequestDTO request)
        {
            var userClaimId = _httpContextAccessor.HttpContext?
                    .User?
                    .FindFirst(ClaimTypes.NameIdentifier)?
                    .Value;

            _logger.LogInformation("Checkout started for {UserId}", userClaimId);

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

                //var userEmail = request.UserEmail;
                var userEmail = _httpContextAccessor.HttpContext?
                    .User?
                    .FindFirst(ClaimTypes.Email)?
                    .Value;

                var userIdClaim = _httpContextAccessor.HttpContext?
                    .User?
                    .FindFirst(ClaimTypes.NameIdentifier)?
                    .Value;

                if (string.IsNullOrEmpty(userIdClaim))
                    throw new Exception("Unauthorized");

                var userId = int.Parse(userIdClaim);

                // OR from JWT claims:
                var createdBy = _httpContextAccessor.HttpContext?
                    .User?
                    .FindFirst(ClaimTypes.Email)?
                    .Value;

                var order = new Order
                {
                    UserId = userId,
                    UserEmail = userEmail,

                    TotalAmount = total,
                    StripeSessionId = session.Id,
                    Status = "Pending",

                    IsActive = true,
                    CreatedAt = DateTime.UtcNow,
                    CreatedBy = userId.ToString()
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
                        CreatedAt = DateTime.UtcNow,
                        CreatedBy = userId.ToString()
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

        public async Task<IEnumerable<OrderDTO>> GetAllOrdersAsync()
        {
            _logger.LogInformation("Fetching all orders");

            var orders = await _orderRepo.GetAllAsync();

            var result = new List<OrderDTO>();

            foreach (var order in orders.OrderByDescending(x => x.CreatedAt))
            {
                // ✅ Fetch user ONCE per order
                var user = await _userRepo.GetByIdAsync(order.UserId);

                // ✅ Get order items
                var orderItems = await _orderItemRepo.FindAsync(
                    x => x.OrderId == order.OrderId
                );

                var itemDtos = new List<OrderItemDTO>();

                foreach (var item in orderItems)
                {
                    // ✅ Get product details
                    var product = await _productRepo.GetByIdAsync(item.ProductId);

                    itemDtos.Add(new OrderItemDTO
                    {
                        OrderItemId = item.OrderItemId,

                        ProductId = item.ProductId,

                        ProductName = product?.Name ?? "Deleted Product",

                        ImageUrl = product?.ImageUrl,

                        Quantity = item.Quantity,

                        Size = item.Size,

                        Price = item.Price
                    });
                }

                result.Add(new OrderDTO
                {
                    OrderId = order.OrderId,

                    UserEmail = order.UserEmail,

                    Username = user?.Username,

                    TotalAmount = order.TotalAmount,

                    Status = order.Status,

                    CreatedAt = order.CreatedAt,

                    TotalItems = itemDtos.Sum(x => x.Quantity),

                    Items = itemDtos
                });
            }

            return result;
        }
        public async Task<IEnumerable<MyOrderResponseDTO>> GetMyOrdersAsync()
        {
            var userIdClaim = _httpContextAccessor.HttpContext?
                .User?
                .FindFirst(ClaimTypes.NameIdentifier)?
                .Value;

            if (string.IsNullOrEmpty(userIdClaim))
                throw new Exception("Unauthorized");

            var userId = int.Parse(userIdClaim);

            var orders = await _orderRepo.FindAsync(x => x.UserId == userId);

            var result = new List<MyOrderResponseDTO>();

            foreach (var order in orders)
            {
                var orderItems = await _orderItemRepo.FindAsync(x => x.OrderId == order.OrderId);

                var items = new List<OrderItemResponseDTO>();

                foreach (var item in orderItems)
                {
                    var product = await _productRepo.GetByIdAsync(item.ProductId);

                    items.Add(new OrderItemResponseDTO
                    {
                        ProductId = item.ProductId,
                        ProductName = product?.Name ?? "Product",
                        ImageUrl = product?.ImageUrl,
                        Quantity = item.Quantity,
                        Size = item.Size,
                        Price = item.Price
                    });
                }

                result.Add(new MyOrderResponseDTO
                {
                    OrderId = order.OrderId,
                    TotalAmount = order.TotalAmount,
                    Status = order.Status,
                    CreatedAt = order.CreatedAt,
                    Items = items
                });
            }

            return result
                .OrderByDescending(x => x.CreatedAt);
        }

        public async Task<OrderDTO?> GetOrderByIdAsync(int id)
        {
            _logger.LogInformation("Fetching order {OrderId}", id);

            var order = await _orderRepo.GetByIdAsync(id);

            var user = await _userRepo.GetByIdAsync(order.UserId);

            if (order == null)
                return null;

            var orderItems = await _orderItemRepo.FindAsync(
                x => x.OrderId == order.OrderId
            );

            var itemDtos = new List<OrderItemDTO>();

            foreach (var item in orderItems)
            {
                var product = await _productRepo.GetByIdAsync(item.ProductId);

                itemDtos.Add(new OrderItemDTO
                {
                    OrderItemId = item.OrderItemId,

                    ProductId = item.ProductId,

                    ProductName = product?.Name ?? "Deleted Product",

                    ImageUrl = product?.ImageUrl,

                    Quantity = item.Quantity,

                    Size = item.Size,

                    Price = item.Price
                });
            }

            return new OrderDTO
            {
                OrderId = order.OrderId,

                Username = user?.Username,

                UserEmail = order.UserEmail,

                TotalAmount = order.TotalAmount,

                Status = order.Status,

                CreatedAt = order.CreatedAt,

                TotalItems = itemDtos.Sum(x => x.Quantity),

                Items = itemDtos
            };
        }

        // 🔄 UPDATE STATUS
        //public async Task<object> UpdateOrderStatusAsync(int id, string status)
        //{
        //    var order = await _orderRepo.GetByIdAsync(id);

        //    if (order == null)
        //        throw new Exception("Order not found");

        //    order.Status = status;

        //    await _orderRepo.UpdateAsync(order);

        //    return new
        //    {
        //        Success = true,
        //        Message = "Status updated"
        //    };
        //}
        public async Task<object> UpdateOrderStatusAsync(int id, string status)
        {
            var validStatuses = new[]
            {
                "Pending",
                "Paid"
            };

            if (!validStatuses.Contains(status))
                throw new Exception("Invalid order status");

            var order = await _orderRepo.GetByIdAsync(id);

            if (order == null)
                throw new Exception("Order not found");

            order.Status = status;

            order.UpdatedAt = DateTime.UtcNow;

            await _orderRepo.UpdateAsync(order);

            return new
            {
                Success = true,
                Message = "Order status updated"
            };
        }

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

                    if (session == null)
                    {
                        _logger.LogError("❌ Session is NULL");
                        return; 
                    }

                    var order = (await _orderRepo.FindAsync(o =>
                        o.StripeSessionId == session.Id
                    )).FirstOrDefault();

                    if (order == null)
                    {
                        _logger.LogError("❌ Order NOT FOUND");
                        return;
                    }


                    if (order.Status == "Paid" &&
                         !string.IsNullOrEmpty(order.StripePaymentIntentId))
                    {
                        return;
                    }

                    order.Status = "Paid";

                    order.StripePaymentIntentId = session.PaymentIntentId;

                    await _orderRepo.UpdateAsync(order);

                    _logger.LogInformation(
                        "✅ Order marked Paid: {OrderId}, PaymentIntent: {PaymentIntentId}",
                        order.OrderId,
                        session.PaymentIntentId
            );
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "❌ WEBHOOK CRASHED");
                throw;
            }
        }
    }
}