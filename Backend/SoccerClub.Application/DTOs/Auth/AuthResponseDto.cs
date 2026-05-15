using SoccerClub.Core.Entities;

namespace SoccerClub.Application.DTOs.Auth;

public class AuthResponseDTO
{
    public string Token { get; set; }

    public string Email { get; set; }

    public string Username { get; set; }

    public string Role { get; set; }
}