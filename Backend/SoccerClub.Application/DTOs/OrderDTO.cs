namespace SoccerClub.Application.DTOs
{
    public class OrderDTO
    {
        public int OrderId { get; set; }
        public string UserEmail { get; set; }
        public decimal TotalAmount { get; set; }
        public string Status { get; set; }
        public List<OrderItemDTO> Items { get; set; }
    }
}