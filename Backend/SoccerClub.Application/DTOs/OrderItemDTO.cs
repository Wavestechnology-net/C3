namespace SoccerClub.Application.DTOs
{
    public class OrderItemDTO
    {
        public int OrderItemId { get; set; }   // useful for admin
        public int ProductId { get; set; }
        public string ProductName { get; set; } // helpful for UI
        public string? ImageUrl { get; set; }   // optional but very useful
        public int Quantity { get; set; }
        public string Size { get; set; }
        public decimal Price { get; set; }      // unit price
        public decimal Total => Price * Quantity; // computed
    }
}