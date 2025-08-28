namespace SoccerClub.Core.Entities
{
    public class Page
    {
        public int Id { get; set; }
        public string Slug { get; set; }
        public string Title { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }

        public ICollection<Section> Sections { get; set; }
    }
}
