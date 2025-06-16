using Microsoft.AspNetCore.Mvc;
using SoccerClub.Api.Models;
using SoccerClub.Application.DTOs;
using SoccerClub.Application.Interfaces;

namespace SoccerClub.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class NewsController : ControllerBase
    {
        private readonly INews _newsService;

        public NewsController(INews newsService)
        {
            _newsService = newsService;
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> GetAllNews()
        {
            try
            {
                var list = await _newsService.GetAllNewsAsync();
                return Ok(ApiResponse<List<NewsDTO>>.SuccessResponse(list, "News list retrieved successfully"));
            }
            catch (Exception ex)
            {
                return StatusCode(500, ApiResponse<List<NewsDTO>>.ErrorResponse("An error occurred", new List<string> { ex.Message }));
            }
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> GetNewsById(int id)
        {
            try
            {
                var result = await _newsService.GetNewsByIdAsync(id);
                if (result == null)
                    return NotFound(ApiResponse<NewsDTO>.ErrorResponse($"News with ID {id} not found"));

                return Ok(ApiResponse<NewsDTO>.SuccessResponse(result, "News retrieved successfully"));
            }
            catch (Exception ex)
            {
                return StatusCode(500, ApiResponse<NewsDTO>.ErrorResponse("An error occurred", new List<string> { ex.Message }));
            }
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> AddNews([FromBody] NewsDTO dto)
        {
            try
            {
                var result = await _newsService.AddNewsAsync(dto);
                return Ok(ApiResponse<object>.SuccessResponse(result, "News added successfully"));
            }
            catch (Exception ex)
            {
                return StatusCode(500, ApiResponse<object>.ErrorResponse("Error adding news", new List<string> { ex.Message }));
            }
        }

        [HttpPut("[action]")]
        public async Task<IActionResult> UpdateNews([FromBody] NewsDTO dto)
        {
            try
            {
                await _newsService.UpdateNewsAsync(dto);
                return Ok(ApiResponse<object>.SuccessResponse(null, "News updated successfully"));
            }
            catch (Exception ex)
            {
                return StatusCode(500, ApiResponse<object>.ErrorResponse("Error updating news", new List<string> { ex.Message }));
            }
        }

        [HttpDelete("[action]")]
        public async Task<IActionResult> DeleteNews(int id)
        {
            try
            {
                await _newsService.DeleteNewsAsync(id);
                return Ok(ApiResponse<object>.SuccessResponse(null, "News deleted successfully"));
            }
            catch (Exception ex)
            {
                return StatusCode(500, ApiResponse<object>.ErrorResponse("Error deleting news", new List<string> { ex.Message }));
            }
        }
    }

}
