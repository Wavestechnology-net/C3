namespace SoccerClub.Core.Entities
{
    public class Content
    {
        public int Id { get; set; }
        public int SectionId { get; set; }
        public string ContentKey { get; set; }
        public string ContentType { get; set; }
        public string Value { get; set; }
        public string Locale { get; set; }
        public bool IsPublished { get; set; }
        public string CreatedBy { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public DateTime? PublishAt { get; set; }
        public string Metadata { get; set; }

        public Section Section { get; set; }
        public ICollection<ContentMedia> ContentMedias { get; set; }
    }
}
