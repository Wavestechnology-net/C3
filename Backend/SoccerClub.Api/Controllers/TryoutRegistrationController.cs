using Microsoft.AspNetCore.Mvc;
using SoccerClub.Api.Models;
using SoccerClub.Application.DTOs;
using SoccerClub.Application.Interfaces;
using SoccerClub.Application.Services;

namespace SoccerClub.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TryoutRegistrationController : ControllerBase
    {
        private readonly ITryoutRegistration _tryoutRegistrationService;

        public TryoutRegistrationController(ITryoutRegistration tryoutRegistrationService)
        {
            _tryoutRegistrationService = tryoutRegistrationService;
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> GetRegistrationsByTryout(int tryoutId)
        {
            try
            {
                var list = await _tryoutRegistrationService.GetAllByTryoutIdAsync(tryoutId);
                return Ok(ApiResponse<List<TryoutRegistrationDTO>>.SuccessResponse(list, "Registrations retrieved successfully"));
            }
            catch (Exception ex)
            {
                return StatusCode(500, ApiResponse<List<TryoutRegistrationDTO>>.ErrorResponse("Error retrieving registrations", new List<string> { ex.Message }));
            }
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> RegisterTryout(int tryoutId, [FromBody] TryoutRegistrationDTO dto)
        {
            try
            {
                var result = await _tryoutRegistrationService.CreateAsync(tryoutId, dto);
                return Ok(ApiResponse<object>.SuccessResponse(result, "Registration completed successfully"));
            }
            catch (Exception ex)
            {
                return StatusCode(500, ApiResponse<object>.ErrorResponse("Error during registration", new List<string> { ex.Message }));
            }
        }
    }

}
