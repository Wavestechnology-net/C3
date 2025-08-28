using SoccerClub.Application.DTOs;

namespace SoccerClub.Application.Interfaces
{
    public interface IAdminContentService
    {
        Task<ContentDTO> UpdateContentAsync(UpdateContentDTO dto);
        Task<MediaDTO> UpdateMediaAsync(UpdateMediaDTO dto);
    }

}
