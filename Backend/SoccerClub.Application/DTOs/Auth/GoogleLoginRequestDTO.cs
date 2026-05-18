using SoccerClub.Core.Entities;

namespace SoccerClub.Application.DTOs.Auth;

public class GoogleLoginRequestDTO

{
    public string IdToken { get; set; }
}