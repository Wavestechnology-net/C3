using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SoccerClub.Core.Entities
{
    public class Team
    {
        public int TeamId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string AgeGroup { get; set; } = string.Empty;
        public string Gender { get; set; } = "Boys"; // or "Girls"
        public int? CoachId { get; set; } // Optional FK to Staff
        public string? Description { get; set; }
        public string? ImageUrl { get; set; }
        public bool IsActive { get; set; } = true;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
