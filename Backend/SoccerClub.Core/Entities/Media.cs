namespace SoccerClub.Core.Entities
{
    public class Media
    {
        public int Id { get; set; }
        public string FileName { get; set; }
        public string MediaUrl { get; set; }
        public string MediaType { get; set; }
        public string AltText { get; set; }
        public DateTime CreatedAt { get; set; }
        public string CreatedBy { get; set; }

        public ICollection<Section> Sections { get; set; }
        public ICollection<ContentMedia> ContentMedias { get; set; }
    }
}
