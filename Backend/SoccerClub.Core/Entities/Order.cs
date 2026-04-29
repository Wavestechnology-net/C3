
namespace SoccerClub.Core.Entities
{
    public class Order
    {
        public int OrderId { get; set; }
        public string? UserEmail { get; set; }
        public decimal TotalAmount { get; set; }

        public string? StripeSessionId { get; set; }
        public string? StripePaymentIntentId { get; set; }

        public string Status { get; set; } = "Pending";

        public bool IsActive { get; set; } = true;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public string? CreatedBy { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public string? UpdatedBy { get; set; }

        public ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();
    }
}
