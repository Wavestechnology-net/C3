using SoccerClub.Core.Entities;

namespace SoccerClub.Application.DTOs.Auth;

public class AuthResponseDTO
{
    public string Token { get; set; }

    public string RefreshToken { get; set; }

    public DateTime ExpiresAt { get; set; }

    public UserDTO User { get; set; }
}