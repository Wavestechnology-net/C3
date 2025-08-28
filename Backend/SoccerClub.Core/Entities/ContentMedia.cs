namespace SoccerClub.Core.Entities
{

    public class ContentMedia
    {
        public int Id { get; set; }
        public int ContentId { get; set; }
        public int MediaId { get; set; }
        public int SortOrder { get; set; }

        public Content Content { get; set; }
        public Media Media { get; set; }
    }
}
