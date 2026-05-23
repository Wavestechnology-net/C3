using AutoMapper;
using Microsoft.EntityFrameworkCore;
using SoccerClub.Application.DTOs;
using SoccerClub.Application.Interfaces;
using SoccerClub.Core.Entities;
using SoccerClub.Core.Interfaces;
using SoccerClub.Infrastructure.Persistence;

namespace SoccerClub.Application.Services
{
    public class PageService : IPageService
    {
        private readonly ApplicationDbContext _context;
        private readonly IAppLogger<PageService> _logger;
        private readonly IMapper _mapper;

        public PageService(ApplicationDbContext context, IAppLogger<PageService> logger, IMapper mapper)
        {
            _context = context;
            _logger = logger;
            _mapper = mapper;
        }

        public async Task<PageDTO> GetPageBySlugAsync(string slug)
        {
            _logger.LogInformation("Fetching page with slug: {Slug}", slug);

            var page = await _context.Pages
                .AsNoTracking()
                .Include(p => p.Sections)
                    .ThenInclude(s => s.BackgroundMedia)
                .Include(p => p.Sections)
                    .ThenInclude(s => s.Contents)
                        .ThenInclude(c => c.ContentMedias)
                            .ThenInclude(cm => cm.Media)
                .FirstOrDefaultAsync(p => p.Slug == slug);

            if (page == null)
            {
                _logger.LogWarning("Page not found: {Slug}", slug);
                return null;
            }

            return _mapper.Map<PageDTO>(page);
        }

        public async Task<PageDTO?> UpdatePageAsync(string slug, PageDTO request)
        {
            var page = await _context.Pages
                .Include(p => p.Sections)
                    .ThenInclude(s => s.BackgroundMedia)
                .Include(p => p.Sections)
                    .ThenInclude(s => s.Contents)
                        .ThenInclude(c => c.ContentMedias)
                            .ThenInclude(cm => cm.Media)
                .FirstOrDefaultAsync(p => p.Slug == slug);

            if (page == null)
                return null;

            // Update Page properties
            page.Title = request.Title ?? "";
            page.Slug = request.Slug ?? page.Slug;
            page.UpdatedAt = DateTime.UtcNow;

            // Update Sections
            foreach (var sectionDto in request.Sections)
            {
                var section = page.Sections.FirstOrDefault(s => s.Id == sectionDto.Id);
                if (section != null)
                {
                    section.Name = sectionDto.Name;
                    section.SectionType = sectionDto.SectionType;
                    section.SortOrder = sectionDto.SortOrder;

                    if (sectionDto.BackgroundMedia != null)
                    {
                        if (section.BackgroundMedia == null)
                        {
                            section.BackgroundMedia = _mapper.Map<Media>(sectionDto.BackgroundMedia);
                        }
                        else
                        {
                            _mapper.Map(sectionDto.BackgroundMedia, section.BackgroundMedia);
                        }
                    }


                    // Handle Contents
                    foreach (var contentDto in sectionDto.Contents)
                    {
                        var content = section.Contents.FirstOrDefault(c => c.Id == contentDto.Id);
                        if (content != null)
                        {
               

                            _mapper.Map(contentDto, content);

                            // Update Media inside Content
                            foreach (var mediaDto in contentDto.Media)
                            {
                                var existingMedia = content.ContentMedias
                                    .FirstOrDefault(cm => cm.MediaId == mediaDto.Id)?.Media;

                                if (existingMedia != null)
                                {

                                    _mapper.Map(existingMedia, mediaDto);
                                }
                                else
                                {
                                    var newMedia = _mapper.Map<Media>(mediaDto);

                                    content.ContentMedias.Add(new ContentMedia
                                    {
                                        Media = newMedia,
                                        SortOrder = contentDto.Media.IndexOf(mediaDto)
                                    });
                                }
                            }
                        }
                    }
                }
            }

            await _context.SaveChangesAsync();

            // Return updated DTO
            return await GetPageBySlugAsync(page.Slug);
        }

        public async Task<List<PageDTO>> GetAllPagesAsync()
        {
            _logger.LogInformation("Fetching all pages");

            var pages = await _context.Pages
                .AsNoTracking()
                .OrderBy(p => p.Title)
                .ToListAsync();

            return _mapper.Map<List<PageDTO>>(pages);
        }
    }
}
