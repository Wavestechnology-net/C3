using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SoccerClub.Application.DTOs;

namespace SoccerClub.Application.Interfaces
{
    public interface INews
    {
        Task<object> AddNewsAsync(NewsDTO dto);
        Task<List<NewsDTO>> GetAllNewsAsync();
        Task<NewsDTO> GetNewsByIdAsync(int id);
        Task UpdateNewsAsync(NewsDTO dto);
        Task DeleteNewsAsync(int id); // Soft delete
    }
}
