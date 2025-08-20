using SoccerClub.Application.DTOs;

namespace SoccerClub.Application.Interfaces
{
    public interface IMediaService
    {
        Task<MediaDTO?> GetMediaByIdAsync(int id);
        Task<MediaDTO> UploadMediaAsync(MediaUploadDTO uploadDto);
        Task DeleteMediaAsync(int id);
    }
}
