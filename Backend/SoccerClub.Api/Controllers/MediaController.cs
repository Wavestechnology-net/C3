using Microsoft.AspNetCore.Mvc;
using SoccerClub.Api.Models;
using SoccerClub.Application.DTOs;
using SoccerClub.Application.Interfaces;

namespace SoccerClub.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MediaController : ControllerBase
    {
        private readonly IMediaService _mediaService;

        public MediaController(IMediaService mediaService)
        {
            _mediaService = mediaService;
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> GetAllMedia()
        {
            try
            {
                var list = await _mediaService.GetAllMedia();
                return Ok(ApiResponse<List<MediaDTO>>.SuccessResponse(list, "Media list retrieved successfully"));
            }
            catch (Exception ex)
            {
                return StatusCode(500, ApiResponse<List<MediaDTO>>.ErrorResponse("An error occurred", new List<string> { ex.Message }));
            }
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> GetMediaById(int id)
        {
            try
            {
                var result = await _mediaService.GetMediaByIdAsync(id);
                if (result == null)
                    return NotFound(ApiResponse<MediaDTO>.ErrorResponse($"Media with ID {id} not found"));

                return Ok(ApiResponse<MediaDTO>.SuccessResponse(result, "Media retrieved successfully"));
            }
            catch (Exception ex)
            {
                return StatusCode(500, ApiResponse<MediaDTO>.ErrorResponse("Error retrieving media", new List<string> { ex.Message }));
            }
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> UploadMedia([FromForm] MediaUploadDTO uploadDto)
        {
            try
            {
                var result = await _mediaService.UploadMediaAsync(uploadDto);
                return Ok(ApiResponse<MediaDTO>.SuccessResponse(result, "Media uploaded successfully"));
            }
            catch (Exception ex)
            {
                return StatusCode(500, ApiResponse<MediaDTO>.ErrorResponse("Error uploading media", new List<string> { ex.Message }));
            }
        }

        [HttpDelete("[action]")]
        public async Task<IActionResult> DeleteMedia(int id)
        {
            try
            {
                await _mediaService.DeleteMediaAsync(id);
                return Ok(ApiResponse<object>.SuccessResponse(null, "Media deleted successfully"));
            }
            catch (Exception ex)
            {
                return StatusCode(500, ApiResponse<object>.ErrorResponse("Error deleting media", new List<string> { ex.Message }));
            }
        }
    }
}
