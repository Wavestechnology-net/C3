using SoccerClub.Application.DTOs;

namespace SoccerClub.Application.Interfaces
{
    public interface IOrderService
    {
        Task<string> CreateCheckoutSessionAsync(CheckoutRequestDTO request);

        Task<IEnumerable<OrderDTO>> GetAllOrdersAsync();
        Task<OrderDTO?> GetOrderByIdAsync(int id);

        Task<object> UpdateOrderStatusAsync(int id, string status);

        Task HandleStripeWebhookAsync(string json, string signature);
    }
}