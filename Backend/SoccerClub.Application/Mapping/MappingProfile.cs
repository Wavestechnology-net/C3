using AutoMapper;
using SoccerClub.Application.DTOs;
using SoccerClub.Core.Entities;

namespace SoccerClub.Application.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<News, NewsDTO>().ReverseMap();
            CreateMap<Tryout, TryoutDTO>().ReverseMap();
            CreateMap<TryoutRegistration, TryoutRegistrationDTO>().ReverseMap();
            CreateMap<TeamProgram, TeamProgramDTO>().ReverseMap();
            CreateMap<ProgramRegistration, ProgramRegistrationDTO>().ReverseMap();
            CreateMap<Staff, StaffDTO>().ReverseMap();
            CreateMap<Team, TeamDTO>().ReverseMap();

            CreateMap<Page, PageDTO>().ReverseMap();
            CreateMap<Section, SectionDTO>().ReverseMap();
            CreateMap<Content, ContentDTO>().ReverseMap();
            CreateMap<Media, MediaDTO>().ReverseMap();
            CreateMap<ContentMedia, ContentMediaDTO>().ReverseMap();

        }
    }
}
