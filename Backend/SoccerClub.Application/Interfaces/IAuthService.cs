using SoccerClub.Application.DTOs.Auth;

namespace SoccerClub.Application.Interfaces
{
    public interface IAuthService
    {
        Task<AuthResponseDTO> RegisterAsync(RegisterDTO request);

        Task<AuthResponseDTO> LoginAsync(LoginDTO request);

        Task<AuthResponseDTO> GoogleLoginAsync(string idToken);

    }
}