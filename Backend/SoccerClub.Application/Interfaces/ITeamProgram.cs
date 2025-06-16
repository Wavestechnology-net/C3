using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SoccerClub.Application.DTOs;

namespace SoccerClub.Application.Interfaces
{
    public interface ITeamProgram
    {
        Task<List<TeamProgramDTO>> GetAllAsync();
        Task<TeamProgramDTO> GetByIdAsync(int id);
        Task<object> CreateAsync(TeamProgramDTO dto);
        Task<object> UpdateAsync(int id, TeamProgramDTO dto);
        Task<object> DeleteAsync(int id); // Soft delete

    }
}
