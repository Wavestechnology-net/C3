using Microsoft.AspNetCore.Mvc;
using SoccerClub.Application.DTOs;
using SoccerClub.Application.Interfaces;

namespace MyApp.WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PagesController : ControllerBase
    {
        private readonly IPageService _pageService;

        public PagesController(IPageService pageService)
        {
            _pageService = pageService;
        }

        [HttpGet("{slug}")]
        public async Task<IActionResult> GetPage(string slug)
        {
            var result = await _pageService.GetPageBySlugAsync(slug);
            if (result == null)
                return NotFound(new { Message = "Page not found" });

            return Ok(result);
        }

        [HttpPut("{slug}/UpdatePage")]
        public async Task<IActionResult> UpdatePage(string slug, PageDTO request)
        {
            var result = await _pageService.UpdatePageAsync(slug, request);
            if (result == null)
                return NotFound(new { Message = "Page not found" });

            return Ok(result);
        }
    }
}
