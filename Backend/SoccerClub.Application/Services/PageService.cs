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

        public PageService(ApplicationDbContext context, IAppLogger<PageService> logger)
        {
            _context = context;
            _logger = logger;
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

            // Manual mapping
            var pageDto = new PageDTO
            {
                Id = page.Id,
                Slug = page.Slug,
                Title = page.Title,
                Sections = page.Sections
                    .OrderBy(s => s.SortOrder)
                    .Select(s => new SectionDTO
                    {
                        Id = s.Id,
                        Name = s.Name,
                        SectionType = s.SectionType,
                        SortOrder = s.SortOrder,
                        BackgroundMedia = s.BackgroundMedia != null
                            ? new MediaDTO
                            {
                                Id = s.BackgroundMedia.Id,
                                FileName = s.BackgroundMedia.FileName,
                                MediaUrl = s.BackgroundMedia.MediaUrl,
                                MediaType = s.BackgroundMedia.MediaType,
                                AltText = s.BackgroundMedia.AltText
                            }
                            : null,
                        Contents = s.Contents
                            .Where(c => c.IsPublished)
                            .Select(c => new ContentDTO
                            {
                                Id = c.Id,
                                ContentKey = c.ContentKey,
                                ContentType = c.ContentType,
                                Value = c.Value,
                                Locale = c.Locale,
                                IsPublished = c.IsPublished,
                                Metadata = c.Metadata,
                                Media = c.ContentMedias
                                    .OrderBy(cm => cm.SortOrder)
                                    .Select(cm => new MediaDTO
                                    {
                                        Id = cm.Media.Id,
                                        FileName = cm.Media.FileName,
                                        MediaUrl = cm.Media.MediaUrl,
                                        MediaType = cm.Media.MediaType,
                                        AltText = cm.Media.AltText
                                    })
                                    .ToList()
                            })
                            .ToList()
                    })
                    .ToList()
            };

            return pageDto;
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
            page.Title = request.Title;
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

                    // Handle Background Media
                    if (sectionDto.BackgroundMedia != null)
                    {
                        if (section.BackgroundMedia == null)
                        {
                            // create new Media
                            section.BackgroundMedia = new Media
                            {
                                FileName = sectionDto.BackgroundMedia.FileName,
                                MediaUrl = sectionDto.BackgroundMedia.MediaUrl,
                                MediaType = sectionDto.BackgroundMedia.MediaType,
                                AltText = sectionDto.BackgroundMedia.AltText
                            };
                        }
                        else
                        {
                            // update existing Media
                            section.BackgroundMedia.FileName = sectionDto.BackgroundMedia.FileName;
                            section.BackgroundMedia.MediaUrl = sectionDto.BackgroundMedia.MediaUrl;
                            section.BackgroundMedia.MediaType = sectionDto.BackgroundMedia.MediaType;
                            section.BackgroundMedia.AltText = sectionDto.BackgroundMedia.AltText;
                        }
                    }

                    // Handle Contents
                    foreach (var contentDto in sectionDto.Contents)
                    {
                        var content = section.Contents.FirstOrDefault(c => c.Id == contentDto.Id);
                        if (content != null)
                        {
                            content.ContentKey = contentDto.ContentKey;
                            content.ContentType = contentDto.ContentType;
                            content.Value = contentDto.Value;
                            content.Locale = contentDto.Locale;
                            content.IsPublished = contentDto.IsPublished;
                            content.Metadata = contentDto.Metadata;

                            // Update Media inside Content
                            foreach (var mediaDto in contentDto.Media)
                            {
                                var existingMedia = content.ContentMedias
                                    .FirstOrDefault(cm => cm.MediaId == mediaDto.Id)?.Media;

                                if (existingMedia != null)
                                {
                                    existingMedia.FileName = mediaDto.FileName;
                                    existingMedia.MediaUrl = mediaDto.MediaUrl;
                                    existingMedia.MediaType = mediaDto.MediaType;
                                    existingMedia.AltText = mediaDto.AltText;
                                }
                                else
                                {
                                    // add new media
                                    var newMedia = new Media
                                    {
                                        FileName = mediaDto.FileName,
                                        MediaUrl = mediaDto.MediaUrl,
                                        MediaType = mediaDto.MediaType,
                                        AltText = mediaDto.AltText
                                    };

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

    }
}
