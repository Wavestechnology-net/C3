using SoccerClub.Application.DTOs;

namespace SoccerClub.Application.Interfaces
{
    public interface IPageService
    {
        Task<PageDTO> GetPageBySlugAsync(string slug);
        Task<PageDTO?> UpdatePageAsync(string slug, PageDTO request);

    }
}
