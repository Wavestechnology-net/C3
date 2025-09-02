using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http;

namespace SoccerClub.Application.DTOs
{
    public class MediaDTO
    {
        public int Id { get; set; }
        public string FileName { get; set; } = string.Empty;
        public string MediaUrl { get; set; } = string.Empty;
        public string MediaType { get; set; } = string.Empty;
        public string AltText { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }

    }

    // For uploads
    public class MediaUploadDTO
    {
        [Required]
        public IFormFile File { get; set; }
        public string AltText { get; set; } = string.Empty;

    }
}
