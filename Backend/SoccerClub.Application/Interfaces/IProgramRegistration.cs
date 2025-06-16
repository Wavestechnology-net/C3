using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SoccerClub.Application.DTOs;

namespace SoccerClub.Application.Interfaces
{
    public interface IProgramRegistration
    {
        Task<List<ProgramRegistrationDTO>> GetAllByProgramIdAsync(int programId);
        Task<object> RegisterAsync(int programId, ProgramRegistrationDTO dto);
    }
}
