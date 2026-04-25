using System.Security.Claims;
using SoccerClub.Core.Entities;

namespace SoccerClub.Application.Interfaces;

public interface IJwtService
{
    string GenerateToken(User user);
    ClaimsPrincipal ValidateToken(string token);
}