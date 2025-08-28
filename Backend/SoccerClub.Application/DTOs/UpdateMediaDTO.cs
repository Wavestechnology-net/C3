namespace SoccerClub.Application.DTOs
{
    public class UpdateMediaDTO
    {
        public int Id { get; set; }
        public string FileName { get; set; }
        public string MediaUrl { get; set; }
        public string MediaType { get; set; }
        public string AltText { get; set; }
    }

}
