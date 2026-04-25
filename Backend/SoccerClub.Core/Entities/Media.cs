namespace SoccerClub.Core.Entities
{
    public class Media
    {
        public int Id { get; set; }
        public string FileName { get; set; } = string.Empty;
        public string MediaUrl { get; set; } = string.Empty;
		public string MediaType { get; set; } = string.Empty;
		public string AltText { get; set; } = string.Empty;
		public bool IsActive { get; set; }
		public DateTime CreatedAt { get; set; }
		public int CreatedBy { get; set; }
		public DateTime? UpdatedAt { get; set; }
		public int? UpdatedBy { get; set; }

		public ICollection<Section> Sections { get; set; }
        public ICollection<ContentMedia> ContentMedias { get; set; }
    }
}
