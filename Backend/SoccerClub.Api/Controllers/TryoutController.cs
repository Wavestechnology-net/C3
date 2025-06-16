using Microsoft.AspNetCore.Mvc;
using SoccerClub.Api.Models;
using SoccerClub.Application.DTOs;
using SoccerClub.Application.Interfaces;
using SoccerClub.Application.Services;

namespace SoccerClub.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TryoutController : ControllerBase
    {
        private readonly ITryout _tryoutService;

        public TryoutController(ITryout tryoutService)
        {
            _tryoutService = tryoutService;
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> GetAllTryouts()
        {
            try
            {
                var result = await _tryoutService.GetAllAsync();
                return Ok(ApiResponse<List<TryoutDTO>>.SuccessResponse(result, "Tryouts retrieved successfully"));
            }
            catch (Exception ex)
            {
                return StatusCode(500, ApiResponse<List<TryoutDTO>>.ErrorResponse("Error retrieving tryouts", new List<string> { ex.Message }));
            }
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> GetTryoutById(int id)
        {
            try
            {
                var result = await _tryoutService.GetByIdAsync(id);
                if (result == null)
                    return NotFound(ApiResponse<TryoutDTO>.ErrorResponse("Tryout not found"));

                return Ok(ApiResponse<TryoutDTO>.SuccessResponse(result, "Tryout retrieved successfully"));
            }
            catch (Exception ex)
            {
                return StatusCode(500, ApiResponse<TryoutDTO>.ErrorResponse("Error retrieving tryout", new List<string> { ex.Message }));
            }
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> CreateTryout([FromBody] TryoutDTO dto)
        {
            try
            {
                var result = await _tryoutService.CreateAsync(dto);
                return Ok(ApiResponse<object>.SuccessResponse(result, "Tryout created successfully"));
            }
            catch (Exception ex)
            {
                return StatusCode(500, ApiResponse<object>.ErrorResponse("Error creating tryout", new List<string> { ex.Message }));
            }
        }

        [HttpPut("[action]")]
        public async Task<IActionResult> UpdateTryout(int id, [FromBody] TryoutDTO dto)
        {
            try
            {
                var result = await _tryoutService.UpdateAsync(id, dto);
                return Ok(ApiResponse<object>.SuccessResponse(result, "Tryout updated successfully"));
            }
            catch (Exception ex)
            {
                return StatusCode(500, ApiResponse<object>.ErrorResponse("Error updating tryout", new List<string> { ex.Message }));
            }
        }

        [HttpDelete("[action]")]
        public async Task<IActionResult> DeleteTryout(int id)
        {
            try
            {
                var result = await _tryoutService.DeleteAsync(id);
                return Ok(ApiResponse<object>.SuccessResponse(result, "Tryout deleted successfully"));
            }
            catch (Exception ex)
            {
                return StatusCode(500, ApiResponse<object>.ErrorResponse("Error deleting tryout", new List<string> { ex.Message }));
            }
        }
    }

}
