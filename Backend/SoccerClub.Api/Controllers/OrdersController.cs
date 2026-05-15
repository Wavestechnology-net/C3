using Microsoft.AspNetCore.Mvc;
using SoccerClub.Application.DTOs;
using Microsoft.AspNetCore.Authorization;
using SoccerClub.Application.Interfaces;
using System.Security.Claims;

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
        [Authorize]
        [HttpPost("[action]")]
        public async Task<IActionResult> Checkout(CheckoutRequestDTO request)
        {
            try
            {
                var userEmail = User.FindFirst(ClaimTypes.Email)?.Value;
                _logger.LogInformation("Checkout started for {Email}", userEmail);

                var url = await _service.CreateCheckoutSessionAsync(request);

                _logger.LogInformation("Checkout session created for {Email}", userEmail);

                return Ok(new { checkoutUrl = url });
            }
            catch (Exception ex)
            {
                var userEmail = User.FindFirst(ClaimTypes.Email)?.Value;
                _logger.LogError(ex, "Checkout failed for {Email}", userEmail);
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

        [Authorize]
        [HttpGet("my-orders")]
        public async Task<IActionResult> GetMyOrders()
        {
            var orders = await _service.GetMyOrdersAsync();

            return Ok(orders);
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
        [AllowAnonymous]
        [HttpPost("webhook")]
        public async Task<IActionResult> StripeWebhook()
        {
            _logger.LogWarning("🔥 WEBHOOK HIT at {Time}", DateTime.UtcNow);

            try
            {
                var json = await new StreamReader(Request.Body).ReadToEndAsync();
                var signature = Request.Headers["Stripe-Signature"];

                _logger.LogWarning("SIGNATURE: {sig}", signature.ToString());

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