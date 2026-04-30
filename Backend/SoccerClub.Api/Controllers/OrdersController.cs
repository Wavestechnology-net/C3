using Microsoft.AspNetCore.Mvc;
using SoccerClub.Application.DTOs;
using SoccerClub.Application.Interfaces;

namespace SoccerClub.Api.Controllers
{
    [ApiController]
    [Route("api/orders")]
    public class OrdersController : ControllerBase
    {
        private readonly IOrderService _service;
        private readonly ILogger<OrdersController> _logger;

        public OrdersController(
            IOrderService service,
            ILogger<OrdersController> logger)
        {
            _service = service;
            _logger = logger;
        }

        // 🛒 CHECKOUT
        [HttpPost("[action]")]
        public async Task<IActionResult> Checkout(CheckoutRequestDTO request)
        {
            try
            {
                _logger.LogInformation("Checkout started for {Email}", request.UserEmail);

                var url = await _service.CreateCheckoutSessionAsync(request);

                _logger.LogInformation("Checkout session created for {Email}", request.UserEmail);

                return Ok(new { checkoutUrl = url });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Checkout failed for {Email}", request.UserEmail);
                return StatusCode(500, new { message = "Checkout failed" });
            }
        }

        // 📦 GET ALL ORDERS
        [HttpGet("[action]")]
        public async Task<IActionResult> GetAllOrders()
        {
            try
            {
                _logger.LogInformation("Fetching all orders");

                var result = await _service.GetAllOrdersAsync();

                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching orders");
                return StatusCode(500, new { message = "Something went wrong" });
            }
        }

        // 📦 GET ORDER BY ID
        [HttpGet("[action]")]
        public async Task<IActionResult> GetOrderById(int id)
        {
            try
            {
                _logger.LogInformation("Fetching order {Id}", id);

                var result = await _service.GetOrderByIdAsync(id);

                if (result == null)
                {
                    _logger.LogWarning("Order not found {Id}", id);
                    return NotFound();
                }

                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching order {Id}", id);
                return StatusCode(500, new { message = "Something went wrong" });
            }
        }

        // 🔄 UPDATE STATUS
        [HttpPut("[action]")]
        public async Task<IActionResult> UpdateOrderStatus(int id, [FromBody] string status)
        {
            try
            {
                _logger.LogInformation("Updating order {Id} status to {Status}", id, status);

                var result = await _service.UpdateOrderStatusAsync(id, status);

                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating order {Id}", id);
                return StatusCode(500, new { message = "Something went wrong" });
            }
        }

        // 🔔 STRIPE WEBHOOK
        [HttpPost("webhook")]
        public async Task<IActionResult> StripeWebhook()
        {
            try
            {
                var json = await new StreamReader(Request.Body).ReadToEndAsync();
                var signature = Request.Headers["Stripe-Signature"];

                _logger.LogInformation("Stripe webhook received");

                await _service.HandleStripeWebhookAsync(json, signature);

                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Stripe webhook failed");
                return StatusCode(500);
            }
        }
    }
}