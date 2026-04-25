using SoccerClub.Application.DTOs;

namespace SoccerClub.Application.Interfaces
{
    public interface ISectionService
    {
        Task<List<SectionDTO>> GetSectionsByPageIdAsync(int pageId);
        Task<bool> UpdateSectionContentAsync(int sectionId, List<ContentDTO> content);
    }
}