namespace SoccerClub.Application.DTOs
{
    public class ContentDTO
    {
        public int Id { get; set; }
        public string ContentKey { get; set; }
        public string ContentType { get; set; }
        public string? Value { get; set; }
        public string? Locale { get; set; }
        public bool IsPublished { get; set; }
        public string? Metadata { get; set; }
        public List<MediaDTO>? Media { get; set; }
    }
}
