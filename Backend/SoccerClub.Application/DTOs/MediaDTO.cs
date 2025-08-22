using Microsoft.AspNetCore.Http;

namespace SoccerClub.Application.DTOs
{
    public class MediaDTO
    {
        public int Id { get; set; }
        public string FileName { get; set; }
        public string MediaUrl { get; set; }
        public string MediaType { get; set; }
        public string AltText { get; set; }
        public DateTime CreatedAt { get; set; }

    }

    // For uploads
    public class MediaUploadDTO
    {
        public IFormFile File { get; set; }
        public string AltText { get; set; }

    }
}
