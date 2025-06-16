using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SoccerClub.Application.DTOs;

namespace SoccerClub.Application.Interfaces
{
    public interface IStaff
    {
        Task<List<StaffDTO>> GetAllAsync();
        Task<StaffDTO> GetByIdAsync(int id);
        Task<object> CreateAsync(StaffDTO dto);
        Task<object> UpdateAsync(int id, StaffDTO dto);
        Task<object> DeleteAsync(int id);
    }
}
