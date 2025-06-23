using Microsoft.AspNetCore.Mvc;
using SoccerClub.Api.Models;
using SoccerClub.Application.DTOs;
using SoccerClub.Application.Interfaces;

namespace SoccerClub.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class WarmupController : ControllerBase
    {

        [HttpGet]
        public async Task<IActionResult> Warmup()
        {
            return Ok("API is up and running.");
        }
    }

}
