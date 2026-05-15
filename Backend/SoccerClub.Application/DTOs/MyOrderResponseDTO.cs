namespace SoccerClub.Application.DTOs
{
    public class MyOrderResponseDTO
    {
        public int OrderId { get; set; }

        public decimal TotalAmount { get; set; }

        public string Status { get; set; }

        public DateTime CreatedAt { get; set; }

        public List<OrderItemResponseDTO> Items { get; set; }
    }
}