using BCrypt.Net;
using Google.Apis.Auth;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using SoccerClub.Application.DTOs.Auth;
using SoccerClub.Application.Interfaces;
using SoccerClub.Core.Entities;
using SoccerClub.Core.Interfaces;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace SoccerClub.Application.Services
{
    public class AuthService : IAuthService
    {
        private readonly IGenericRepository<User> _userRepo;
        private readonly IConfiguration _config;
        private readonly IJwtService _jwtService;

        public AuthService(
            IGenericRepository<User> userRepo,
            IConfiguration config, IJwtService jwtService)
        {
            _userRepo = userRepo;
            _config = config;
            _jwtService = jwtService;
        }

        // REGISTER
        public async Task<AuthResponseDTO> RegisterAsync(RegisterDTO request)
        {
            // Check email exists
            var existingUser = (await _userRepo.FindAsync(
                x => x.Email == request.Email
            )).FirstOrDefault();

            if (existingUser != null)
            {
                throw new Exception("Email already exists");
            }

            // Hash password
            var hashedPassword =
                BCrypt.Net.BCrypt.HashPassword(request.Password);

            // Create user
            var user = new User
            {
                Username = request.Username,
                Email = request.Email,
                PasswordHash = hashedPassword,
                Role = "User",
                IsActive = true,
                CreatedAt = DateTime.UtcNow
            };

            await _userRepo.AddAsync(user);

            // Generate JWT
            var token = _jwtService.GenerateToken(user);

            return new AuthResponseDTO
            {
                Token = token,
                Email = user.Email,
                Username = user.Username,
                Role = user.Role
            };
        }

        // LOGIN
        public async Task<AuthResponseDTO> LoginAsync(LoginDTO request)
        {
            var user = (await _userRepo.FindAsync(
                x => x.Email == request.Email
            )).FirstOrDefault();

            if (user == null)
            {
                throw new Exception("Invalid email or password");
            }

            // Verify password
            bool isValidPassword =
                BCrypt.Net.BCrypt.Verify(
                    request.Password,
                    user.PasswordHash
                );

            if (!isValidPassword)
            {
                throw new Exception("Invalid email or password");
            }

            if (!user.IsActive)
            {
                throw new Exception("Account is disabled");
            }

            // Generate JWT
            var token = _jwtService.GenerateToken(user);

            return new AuthResponseDTO
            {
                Token = token,
                Email = user.Email,
                Username = user.Username,
                Role = user.Role
            };
        }

        public async Task<AuthResponseDTO> GoogleLoginAsync(string idToken)
        {
            var payload = await GoogleJsonWebSignature.ValidateAsync(idToken);

            var email = payload.Email;
            var name = payload.Name;
            var googleId = payload.Subject;

            var user = await _userRepo.GetByConditionAsync(x => x.Email == email);

            if (user == null)
            {
                user = new User
                {
                    Username = name,
                    Email = email,
                    GoogleId = googleId,
                    Role = "User", // default role
                    IsActive = true,
                    CreatedAt = DateTime.UtcNow
                };

                await _userRepo.AddAsync(user);
                await _userRepo.SaveChangesAsync();
            }

            var token = _jwtService.GenerateToken(user);

            return new AuthResponseDTO
            {
                Token = token,
                Email = user.Email,
                Username = user.Username,
                Role = user.Role
            };
        }
    }
}