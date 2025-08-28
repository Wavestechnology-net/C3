namespace SoccerClub.Core.Entities
{
    public class Section
    {
        public int Id { get; set; }
        public int PageId { get; set; }
        public string Name { get; set; }
        public string SectionType { get; set; }
        public int SortOrder { get; set; }
        public int? BackgroundMediaId { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }

        public Page Page { get; set; }
        public Media BackgroundMedia { get; set; }
        public ICollection<Content> Contents { get; set; }
    }
}
