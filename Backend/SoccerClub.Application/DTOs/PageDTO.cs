namespace SoccerClub.Application.DTOs
{
    public class PageDTO
    {
        public int Id { get; set; }
        public string Slug { get; set; }
        public string? Title { get; set; }
        public List<SectionDTO> Sections { get; set; }
    }




}
