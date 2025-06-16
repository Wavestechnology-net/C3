using Microsoft.AspNetCore.Mvc;
using SoccerClub.Api.Models;
using SoccerClub.Application.DTOs;
using SoccerClub.Application.Interfaces;
using SoccerClub.Application.Services;

namespace SoccerClub.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProgramRegistrationController : ControllerBase
    {
        private readonly IProgramRegistration _programRegistrationservice;

        public ProgramRegistrationController(IProgramRegistration programRegistrationservice)
        {
            _programRegistrationservice = programRegistrationservice;
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> GetAllRegistrations(int programId)
        {
            try
            {
                var result = await _programRegistrationservice.GetAllByProgramIdAsync(programId);
                return Ok(ApiResponse<List<ProgramRegistrationDTO>>.SuccessResponse(result, "Registrations retrieved"));
            }
            catch (Exception ex)
            {
                return StatusCode(500, ApiResponse<List<ProgramRegistrationDTO>>.ErrorResponse("Error fetching registrations", new List<string> { ex.Message }));
            }
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> Register(int programId, [FromBody] ProgramRegistrationDTO dto)
        {
            try
            {
                var result = await _programRegistrationservice.RegisterAsync(programId, dto);
                return Ok(ApiResponse<object>.SuccessResponse(result, "Registration successful"));
            }
            catch (Exception ex)
            {
                return StatusCode(500, ApiResponse<object>.ErrorResponse("Error registering", new List<string> { ex.Message }));
            }
        }
    }

}
