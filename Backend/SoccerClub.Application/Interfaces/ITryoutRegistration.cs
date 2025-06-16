using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SoccerClub.Application.DTOs;

namespace SoccerClub.Application.Interfaces
{
    public interface ITryoutRegistration
    {
        Task<List<TryoutRegistrationDTO>> GetAllByTryoutIdAsync(int tryoutId);
        Task<object> CreateAsync(int tryoutId, TryoutRegistrationDTO dto);
    }
}
