namespace SoccerClub.Application.DTOs
{
    public class CheckoutRequestDTO
    {
        public string UserEmail { get; set; }
        public List<CartItemDTO> Items { get; set; }
    }
}