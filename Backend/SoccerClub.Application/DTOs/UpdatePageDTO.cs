namespace SoccerClub.Application.DTOs
{
    public class UpdatePageDTO
    {
        public int Id { get; set; }
        public string Slug { get; set; }
        public string? Title { get; set; }
        public List<SectionDTO> Sections { get; set; }
    }





}
