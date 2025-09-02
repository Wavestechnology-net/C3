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
        public bool IsActive { get; set; }
		public DateTime CreatedAt { get; set; }
        public int CreatedBy { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public int? UpdatedBy { get; set; }
        
        public Section Section { get; set; }
        public ICollection<ContentMedia> ContentMedias { get; set; }
    }
}
