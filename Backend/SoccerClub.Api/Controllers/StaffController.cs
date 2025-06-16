using Microsoft.AspNetCore.Mvc;
using SoccerClub.Api.Models;
using SoccerClub.Application.DTOs;
using SoccerClub.Application.Interfaces;
using SoccerClub.Application.Services;

namespace SoccerClub.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StaffController : ControllerBase
    {
        private readonly IStaff _staffService;

        public StaffController(IStaff staffService)
        {
            _staffService = staffService;
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> GetAllStaff()
        {
            try
            {
                var result = await _staffService.GetAllAsync();
                return Ok(ApiResponse<List<StaffDTO>>.SuccessResponse(result, "Staff retrieved"));
            }
            catch (Exception ex)
            {
                return StatusCode(500, ApiResponse<List<StaffDTO>>.ErrorResponse("Error retrieving staff", new List<string> { ex.Message }));
            }
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> GetStaffById(int id)
        {
            try
            {
                var result = await _staffService.GetByIdAsync(id);
                if (result == null)
                    return NotFound(ApiResponse<StaffDTO>.ErrorResponse("Staff not found"));

                return Ok(ApiResponse<StaffDTO>.SuccessResponse(result, "Staff retrieved"));
            }
            catch (Exception ex)
            {
                return StatusCode(500, ApiResponse<StaffDTO>.ErrorResponse("Error fetching staff", new List<string> { ex.Message }));
            }
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> CreateStaff([FromBody] StaffDTO dto)
        {
            try
            {
                var result = await _staffService.CreateAsync(dto);
                return Ok(ApiResponse<object>.SuccessResponse(result, "Staff created"));
            }
            catch (Exception ex)
            {
                return StatusCode(500, ApiResponse<object>.ErrorResponse("Error creating staff", new List<string> { ex.Message }));
            }
        }

        [HttpPut("[action]")]
        public async Task<IActionResult> UpdateStaff(int id, [FromBody] StaffDTO dto)
        {
            try
            {
                var result = await _staffService.UpdateAsync(id, dto);
                return Ok(ApiResponse<object>.SuccessResponse(result, "Staff updated"));
            }
            catch (Exception ex)
            {
                return StatusCode(500, ApiResponse<object>.ErrorResponse("Error updating staff", new List<string> { ex.Message }));
            }
        }

        [HttpDelete("[action]")]
        public async Task<IActionResult> DeleteStaff(int id)
        {
            try
            {
                var result = await _staffService.DeleteAsync(id);
                return Ok(ApiResponse<object>.SuccessResponse(result, "Staff deleted"));
            }
            catch (Exception ex)
            {
                return StatusCode(500, ApiResponse<object>.ErrorResponse("Error deleting staff", new List<string> { ex.Message }));
            }
        }
    }

}
