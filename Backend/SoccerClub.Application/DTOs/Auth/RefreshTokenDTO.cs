using SoccerClub.Core.Entities;

namespace SoccerClub.Application.DTOs.Auth;

public class RefreshTokenRequestDTO
{
    public string RefreshToken { get; set; }
}