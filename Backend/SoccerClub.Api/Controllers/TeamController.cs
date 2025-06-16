using Microsoft.AspNetCore.Mvc;
using SoccerClub.Api.Models;
using SoccerClub.Application.DTOs;
using SoccerClub.Application.Interfaces;
using SoccerClub.Application.Services;

namespace SoccerClub.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TeamController : ControllerBase
    {
        private readonly ITeam _teamService;

        public TeamController(ITeam teamService)
        {
            _teamService = teamService;
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> GetAllTeams()
        {
            try
            {
                var result = await _teamService.GetAllAsync();
                return Ok(ApiResponse<List<TeamDTO>>.SuccessResponse(result, "Teams retrieved"));
            }
            catch (Exception ex)
            {
                return StatusCode(500, ApiResponse<List<TeamDTO>>.ErrorResponse("Error retrieving teams", new List<string> { ex.Message }));
            }
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> GetTeamById(int id)
        {
            try
            {
                var result = await _teamService.GetByIdAsync(id);
                if (result == null)
                    return NotFound(ApiResponse<TeamDTO>.ErrorResponse("Team not found"));

                return Ok(ApiResponse<TeamDTO>.SuccessResponse(result, "Team retrieved"));
            }
            catch (Exception ex)
            {
                return StatusCode(500, ApiResponse<TeamDTO>.ErrorResponse("Error fetching team", new List<string> { ex.Message }));
            }
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> CreateTeam([FromBody] TeamDTO dto)
        {
            try
            {
                var result = await _teamService.CreateAsync(dto);
                return Ok(ApiResponse<object>.SuccessResponse(result, "Team created"));
            }
            catch (Exception ex)
            {
                return StatusCode(500, ApiResponse<object>.ErrorResponse("Error creating team", new List<string> { ex.Message }));
            }
        }

        [HttpPut("[action]")]
        public async Task<IActionResult> UpdateTeam(int id, [FromBody] TeamDTO dto)
        {
            try
            {
                var result = await _teamService.UpdateAsync(id, dto);
                return Ok(ApiResponse<object>.SuccessResponse(result, "Team updated"));
            }
            catch (Exception ex)
            {
                return StatusCode(500, ApiResponse<object>.ErrorResponse("Error updating team", new List<string> { ex.Message }));
            }
        }

        [HttpDelete("[action]")]
        public async Task<IActionResult> DeleteTeam(int id)
        {
            try
            {
                var result = await _teamService.DeleteAsync(id);
                return Ok(ApiResponse<object>.SuccessResponse(result, "Team deleted"));
            }
            catch (Exception ex)
            {
                return StatusCode(500, ApiResponse<object>.ErrorResponse("Error deleting team", new List<string> { ex.Message }));
            }
        }
    }

}
