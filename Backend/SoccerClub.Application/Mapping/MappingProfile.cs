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
            CreateMap<Media, MediaDTO>().ReverseMap()
     .ForMember(dest => dest.Sections, opt => opt.Ignore())
     .ForMember(dest => dest.ContentMedias, opt => opt.Ignore());


        }
    }
}
