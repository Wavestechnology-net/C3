using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SoccerClub.Application.DTOs;

namespace SoccerClub.Application.Interfaces
{
    public interface ITryout
    {
        Task<List<TryoutDTO>> GetAllAsync();
        Task<TryoutDTO> GetByIdAsync(int id);
        Task<object> CreateAsync(TryoutDTO dto);
        Task<object> UpdateAsync(int id, TryoutDTO dto);
        Task<object> DeleteAsync(int id);
    }
}
