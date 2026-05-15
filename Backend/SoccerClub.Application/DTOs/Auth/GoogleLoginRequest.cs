using SoccerClub.Core.Entities;

namespace SoccerClub.Application.DTOs.Auth;

public class GoogleLoginRequest
{
    public string IdToken { get; set; }
}