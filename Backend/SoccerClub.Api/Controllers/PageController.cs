using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SoccerClub.Api.Models;
using SoccerClub.Application.DTOs;
using SoccerClub.Application.Interfaces;

namespace MyApp.WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PagesController : ControllerBase
    {
        private readonly IPageService _pageService;
		private readonly ISectionService _sectionService;

		public PagesController(IPageService pageService, ISectionService sectionService)
        {
            _pageService = pageService;
			_sectionService = sectionService;
		}

        [HttpGet]
		public async Task<IActionResult> GetPages()
		{
			var result = await _pageService.GetAllPagesAsync();

            if(result is null)
                return NotFound(new ApiResponse<object>
                {
                    Message = "Pages Not Found"
                });

			return Ok(new ApiResponse<List<PageDTO>>{ 
                Data = result,
                Success = true
            });
		}

		[HttpGet("{slug}")]
        public async Task<IActionResult> GetPage(string slug)
        {
            var result = await _pageService.GetPageBySlugAsync(slug);

			if (result is null)
				return NotFound(new ApiResponse<object>
				{
					Message = "Page Not Found"
				});


			return Ok(new ApiResponse<PageDTO>
			{
				Data = result,
				Success = true
			});
		}

		[HttpGet("{pageId}/sections")]
		public async Task<IActionResult> GetSectionsByPage(int pageId)
		{
			var result = await _sectionService.GetSectionsByPageIdAsync(pageId);

			if (result is null)
				return NotFound(new ApiResponse<object>
				{
					Message = "Page Not Found"
				});


			return Ok(new ApiResponse<List<SectionDTO>>
			{
				Data = result,
				Success = true
			});
		}

		[Authorize(Roles = "Admin")]
        [HttpPut("{slug}/UpdatePage")]
        public async Task<IActionResult> UpdatePage(string slug, PageDTO request)
        {
            var result = await _pageService.UpdatePageAsync(slug, request);
			if (result is null)
				return NotFound(new ApiResponse<object>
				{
					Message = "Page Not Found"
				});

			return Ok(new ApiResponse<PageDTO>
			{
				Data = result,
				Success = true,
				Message = "Page updated successfully."
			});
		}
    }
}
