using Microsoft.EntityFrameworkCore;
using SoccerClub.Application.DTOs;
using SoccerClub.Application.Interfaces;
using SoccerClub.Core.Entities;
using SoccerClub.Core.Interfaces;
using SoccerClub.Infrastructure.Persistence;
using AutoMapper;

namespace SoccerClub.Application.Services
{
    public class SectionService : ISectionService
    {
        private readonly ApplicationDbContext _context;
        private readonly IAppLogger<SectionService> _logger;
        private readonly IMapper _mapper;

        public SectionService(ApplicationDbContext context, IAppLogger<SectionService> logger, IMapper mapper)
        {
            _context = context;
            _logger = logger;
            _mapper = mapper;
        }

        public async Task<List<SectionDTO>> GetSectionsByPageIdAsync(int pageId)
        {
            var sections = await _context.Sections
                .AsNoTracking()
                .Include(s => s.BackgroundMedia)
                .Include(s => s.Contents)
                    .ThenInclude(c => c.ContentMedias)
                        .ThenInclude(cm => cm.Media)
                .Where(s => s.PageId == pageId)
                .OrderBy(s => s.SortOrder)
                .ToListAsync();

            return _mapper.Map<List<SectionDTO>>(sections);
        }

        public async Task<bool> UpdateSectionContentAsync(int sectionId, List<ContentDTO> contentDtos)
        {
            _logger.LogInformation("Updating section content for section ID: {SectionId}", sectionId);

            var section = await _context.Sections
                .Include(s => s.Contents)
                .FirstOrDefaultAsync(s => s.Id == sectionId);

            if (section == null)
            {
                _logger.LogWarning("Section not found: {SectionId}", sectionId);
                return false;
            }

            // Update or create content items
            foreach (var contentDto in contentDtos)
            {
                var existingContent = section.Contents.FirstOrDefault(c => c.Id == contentDto.Id);

                if (existingContent != null)
                {
                    // Update existing content
                    _mapper.Map(contentDto, existingContent);
                    existingContent.UpdatedAt = DateTime.UtcNow;
                }
                else
                {
                    // Create new content
                    var newContent = _mapper.Map<Content>(contentDto);
                    newContent.SectionId = sectionId;
                    newContent.CreatedAt = DateTime.UtcNow;
                    section.Contents.Add(newContent);
                }
            }

            section.UpdatedAt = DateTime.UtcNow;
            await _context.SaveChangesAsync();

            return true;
        }
    }
}