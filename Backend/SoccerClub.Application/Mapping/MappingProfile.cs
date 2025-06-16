using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using SoccerClub.Application.DTOs;
using SoccerClub.Core.Entities;
using static System.Runtime.InteropServices.JavaScript.JSType;

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
        }
    }
}
