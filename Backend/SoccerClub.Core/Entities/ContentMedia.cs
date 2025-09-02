namespace SoccerClub.Core.Entities
{

    public class ContentMedia
    {
        public int Id { get; set; }
        public int ContentId { get; set; }
        public int MediaId { get; set; }
        public int SortOrder { get; set; }
		public bool IsActive { get; set; }
		public DateTime CreatedAt { get; set; }
		public int CreatedBy { get; set; }
		public DateTime? UpdatedAt { get; set; }
		public int? UpdatedBy { get; set; }

		public Content Content { get; set; }
        public Media Media { get; set; }
    }
}
