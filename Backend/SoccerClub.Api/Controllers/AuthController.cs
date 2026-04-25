using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using SoccerClub.Api.Models;
using SoccerClub.Application.DTOs.Auth;
using SoccerClub.Application.Interfaces;
using SoccerClub.Core.Entities;
using SoccerClub.Core.Interfaces;

namespace SoccerClub.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IGenericRepository<User> _userRepository;
        private readonly IJwtService _jwtService;
        private readonly PasswordHasher<User> _passwordHasher = new();

        public AuthController(IGenericRepository<User> userRepository, IJwtService jwtService)
        {
            _userRepository = userRepository;
            _jwtService = jwtService;
        }

        [Authorize(Roles = "Admin")]
        [HttpPost("Register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto dto)
        {
            if (await _userRepository.FindAsync(u => u.Username == dto.Username) != null)
                return BadRequest("Username already exists");

            var user = new User
            {
                Username = dto.Username,
                Email = dto.Email,
                Role = dto.Role,
                PasswordHash = _passwordHasher.HashPassword(null, dto.Password)
            };

            await _userRepository.AddAsync(user);

            return Ok("User registered successfully");
        }

        [HttpPost("Login")]
        public async Task<IActionResult> Login([FromBody] LoginDto dto)
        {
            var foundUsers = await _userRepository.FindAsync(u => u.Username == dto.Username);
            var user = foundUsers.FirstOrDefault();

            if (user == null) return Unauthorized();

            var result = _passwordHasher.VerifyHashedPassword(null, user.PasswordHash, dto.Password);
            if (result == PasswordVerificationResult.Failed)
                return Unauthorized();

            var token = _jwtService.GenerateToken(user);

            var response = new AuthResponseDto
            {
                Token = token,
                ExpiresAt = DateTime.UtcNow.AddMinutes(60),
                User = new UserDto
                {
                    Id = user.Id,
                    Username = dto.Username,
                    Email = user.Email,
                    Role = user.Role,
                },
            };

            return Ok(new ApiResponse<AuthResponseDto>
			{
				Data = response,
				Success = true
			});
        }
    }
}
