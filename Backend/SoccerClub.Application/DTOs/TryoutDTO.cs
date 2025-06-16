using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SoccerClub.Application.DTOs
{
    public class TryoutDTO
    {
        public int TryoutId { get; set; }
        public string Title { get; set; } = string.Empty;
        public DateTime TryoutDate { get; set; }
        public string Location { get; set; } = string.Empty;
        public string? Description { get; set; }
        public bool IsActive { get; set; } = true;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
