using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SoccerClub.Api.Models;
using SoccerClub.Application.DTOs;
using SoccerClub.Application.Interfaces;

namespace SoccerClub.Api.Controllers
{
	[Route("api/sections")]
	[ApiController]
	public class SectionController : ControllerBase
	{
		private readonly ISectionService _sectionService;

		public SectionController(ISectionService sectionService)
		{
			_sectionService = sectionService;
		}

		[HttpPut("{id}")]
		public async Task<IActionResult> UpdateSection(int id, [FromBody] UpdateSectionRequest request)
		{
			try
			{
				await _sectionService.UpdateSectionContentAsync(id, request.Content);
				return Ok(new ApiResponse<object>
				{
					Data = null,
					Message = "Section updated successfully",
					Success = true
				});
			}
			catch (Exception ex)
			{
				return StatusCode(500, new ApiResponse<object>
				{
					Data = null,
					Message = "Error updating section",
					Success = false,
					Errors = new List<string> { ex.Message }
				});
			}
		}
	}

	public class UpdateSectionRequest
	{
		public List<ContentDTO> Content { get; set; }
	}
}
