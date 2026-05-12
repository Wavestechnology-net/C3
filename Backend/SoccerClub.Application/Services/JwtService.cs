using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using SoccerClub.Application.Interfaces;
using SoccerClub.Application.Settings;
using SoccerClub.Core.Entities;

namespace SoccerClub.Application.Services;

public class JwtService : IJwtService
{
    private readonly JwtSettings _jwtSettings;

    public JwtService(JwtSettings jwtSettings)
    {
        _jwtSettings = jwtSettings;

		if (string.IsNullOrEmpty(_jwtSettings.Key) || Encoding.UTF8.GetByteCount(_jwtSettings.Key) < 16)
		{
			throw new ArgumentException("JWT Key must be at least 16 characters long for HS256", nameof(_jwtSettings.Key));
		}
	}

    public string GenerateToken(User user)
    {
        var key = Encoding.UTF8.GetBytes(_jwtSettings.Key);
        var claims = new[]
        {
            new Claim(ClaimTypes.Name, user.Username),
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(ClaimTypes.Role, user.Role)
        };

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(claims),
            Expires = DateTime.UtcNow.AddMinutes(_jwtSettings.DurationInMinutes),
            Issuer = _jwtSettings.Issuer,
            Audience = _jwtSettings.Audience,
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256)
        };

        var tokenHandler = new JwtSecurityTokenHandler();
        var token = tokenHandler.CreateToken(tokenDescriptor);
        return tokenHandler.WriteToken(token);
    }

    public ClaimsPrincipal ValidateToken(string token)
    {
        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.UTF8.GetBytes(_jwtSettings.Key);

        try
        {
			var validationParameters = new TokenValidationParameters
			{
				ValidateIssuer = true,
				ValidateAudience = true,
				ValidateLifetime = true,
				ValidateIssuerSigningKey = true,
				ValidIssuer = _jwtSettings.Issuer,
				ValidAudience = _jwtSettings.Audience,
				IssuerSigningKey = new SymmetricSecurityKey(key)
			};

			return tokenHandler.ValidateToken(token, validationParameters, out _);
        }
		catch (SecurityTokenExpiredException)
		{
			Console.WriteLine("Token has expired");
			return new ClaimsPrincipal(new ClaimsIdentity());
		}
		catch (SecurityTokenInvalidSignatureException)
		{
			Console.WriteLine("Invalid token signature");
			return new ClaimsPrincipal(new ClaimsIdentity());
		}
		catch (Exception ex)
		{
			Console.WriteLine($"Token validation error: {ex.Message}");
			return new ClaimsPrincipal(new ClaimsIdentity());
		}
	}
}