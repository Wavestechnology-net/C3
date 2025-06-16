using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SoccerClub.Application.DTOs;

namespace SoccerClub.Application.Interfaces
{
    public interface ITeam
    {
        Task<List<TeamDTO>> GetAllAsync();
        Task<TeamDTO> GetByIdAsync(int id);
        Task<object> CreateAsync(TeamDTO dto);
        Task<object> UpdateAsync(int id, TeamDTO dto);
        Task<object> DeleteAsync(int id);
    }
}
