using Microsoft.AspNetCore.Mvc;
using SoccerClub.Api.Models;
using SoccerClub.Application.DTOs;
using SoccerClub.Application.Interfaces;

namespace SoccerClub.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProgramController : ControllerBase
    {
        private readonly ITeamProgram _teamProgramService;

        public ProgramController(ITeamProgram teamProgramService)
        {
            _teamProgramService = teamProgramService;
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> GetAllPrograms()
        {
            try
            {
                var result = await _teamProgramService.GetAllAsync();
                return Ok(ApiResponse<List<TeamProgramDTO>>.SuccessResponse(result, "Programs retrieved successfully"));
            }
            catch (Exception ex)
            {
                return StatusCode(500, ApiResponse<List<TeamProgramDTO>>.ErrorResponse("An error occurred", new List<string> { ex.Message }));
            }
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> GetProgramById(int id)
        {
            try
            {
                var result = await _teamProgramService.GetByIdAsync(id);
                if (result == null)
                    return NotFound(ApiResponse<TeamProgramDTO>.ErrorResponse("Program not found"));

                return Ok(ApiResponse<TeamProgramDTO>.SuccessResponse(result, "Program retrieved successfully"));
            }
            catch (Exception ex)
            {
                return StatusCode(500, ApiResponse<TeamProgramDTO>.ErrorResponse("An error occurred", new List<string> { ex.Message }));
            }
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> CreateProgram([FromBody] TeamProgramDTO dto)
        {
            try
            {
                var result = await _teamProgramService.CreateAsync(dto);
                return Ok(ApiResponse<object>.SuccessResponse(result, "Program created successfully"));
            }
            catch (Exception ex)
            {
                return StatusCode(500, ApiResponse<object>.ErrorResponse("Error creating program", new List<string> { ex.Message }));
            }
        }

        [HttpPut("[action]")]
        public async Task<IActionResult> UpdateProgram(int id, [FromBody] TeamProgramDTO dto)
        {
            try
            {
                var result = await _teamProgramService.UpdateAsync(id, dto);
                return Ok(ApiResponse<object>.SuccessResponse(result, "Program updated successfully"));
            }
            catch (Exception ex)
            {
                return StatusCode(500, ApiResponse<object>.ErrorResponse("Error updating program", new List<string> { ex.Message }));
            }
        }

        [HttpDelete("[action]")]
        public async Task<IActionResult> DeleteProgram(int id)
        {
            try
            {
                var result = await _teamProgramService.DeleteAsync(id);
                return Ok(ApiResponse<object>.SuccessResponse(result, "Program deleted successfully"));
            }
            catch (Exception ex)
            {
                return StatusCode(500, ApiResponse<object>.ErrorResponse("Error deleting program", new List<string> { ex.Message }));
            }
        }
    }
}
