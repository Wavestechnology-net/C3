using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SoccerClub.Core.Entities
{
    public class ProgramRegistration
    {
        public int ProgramRegistrationId { get; set; }
        public string PlayerName { get; set; } = string.Empty;
        public string ParentName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public DateTime DOB { get; set; }
        public int TeamProgramsId { get; set; }
        public bool IsActive { get; set; } = true;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public TeamProgram TeamProgram { get; set; } = null!;
    }
}
