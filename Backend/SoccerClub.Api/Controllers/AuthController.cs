using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SoccerClub.Application.DTOs.Auth;
using SoccerClub.Application.Interfaces;
using System.Security.Claims;

namespace SoccerClub.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        // REGISTER
        [HttpPost("register")]
        public async Task<IActionResult> Register(
            RegisterDTO request)
        {
            try
            {
                var result =
                    await _authService.RegisterAsync(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(new
                {
                    message = ex.Message
                });
            }
        }

        // LOGIN
        [HttpPost("login")]
        public async Task<IActionResult> Login(
            LoginDTO request)
        {
            try
            {
                var result =
                    await _authService.LoginAsync(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(new
                {
                    message = ex.Message
                });
            }
        }

        [HttpPost("google-login")]
        public async Task<IActionResult> GoogleLogin(GoogleLoginRequestDTO request)
        {
            var token = await _authService.GoogleLoginAsync(request.IdToken);
            return Ok(new { token });
        }



        [HttpPost("refresh-token")]
        public async Task<IActionResult> RefreshToken(RefreshTokenRequestDTO request)
        {
            var response =
                await _authService.RefreshTokenAsync(request);

            return Ok(response);
        }

        [Authorize]
        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            var userId =
                User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            await _authService.LogoutAsync(
                int.Parse(userId));

            return Ok(new
            {
                message = "Logged out successfully"
            });
        }

        [HttpPost("forgot-password")]
        public async Task<IActionResult> ForgotPassword(ForgotPasswordDTO request)
        {
            await _authService.ForgotPasswordAsync(request);

            return Ok(new
            {
                message =
                    "If the email exists, a reset link has been sent."
            });
        }

        [HttpPost("reset-password")]
        public async Task<IActionResult> ResetPassword(ResetPasswordDTO request)
        {
            await _authService.ResetPasswordAsync(request);

            return Ok(new
            {
                message = "Password reset successful"
            });
        }
    }
}