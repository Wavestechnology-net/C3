namespace SoccerClub.Application.DTOs
{
    public class OrderDTO
    {
        public int OrderId { get; set; }

        public string? Username { get; set; }
        public string UserEmail { get; set; }
        public decimal TotalAmount { get; set; }
        public string Status { get; set; }

        public string? ImageUrl { get; set; }

        public DateTime CreatedAt { get; set; }

        public int TotalItems { get; set; }
        public List<OrderItemDTO> Items { get; set; }
    }
}