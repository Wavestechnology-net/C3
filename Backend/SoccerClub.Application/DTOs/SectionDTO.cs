namespace SoccerClub.Application.DTOs
{
    public class SectionDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string SectionType { get; set; }
        public int SortOrder { get; set; }
        public MediaDTO? BackgroundMedia { get; set; }
        public List<ContentDTO> Contents { get; set; }
    }

}
