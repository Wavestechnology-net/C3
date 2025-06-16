using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using SoccerClub.Application.DTOs;
using SoccerClub.Application.Interfaces;
using SoccerClub.Core.Entities;
using SoccerClub.Core.Interfaces;

namespace SoccerClub.Application.Services
{
    public class ProgramRegistrationService : IProgramRegistration
    {
        private readonly IAppLogger<ProgramRegistrationService> _logger;
        private readonly IMapper _mapper;
        private readonly IGenericRepository<ProgramRegistration> _registrationRepo;
        private readonly IGenericRepository<TeamProgram> _programRepo;

        public ProgramRegistrationService(
            IAppLogger<ProgramRegistrationService> logger,
            IMapper mapper,
            IGenericRepository<ProgramRegistration> registrationRepo,
            IGenericRepository<TeamProgram> programRepo)
        {
            _logger = logger;
            _mapper = mapper;
            _registrationRepo = registrationRepo;
            _programRepo = programRepo;
        }

        public async Task<List<ProgramRegistrationDTO>> GetAllByProgramIdAsync(int programId)
        {
            try
            {
                var data = await _registrationRepo.GetAllAsync(r => r.TeamProgramsId == programId);
                return _mapper.Map<List<ProgramRegistrationDTO>>(data);
            }
            catch (Exception ex)
            {
                _logger.LogError("Error getting registrations for ProgramId {Id}: {Exception}", ex, programId);
                throw;
            }
        }

        public async Task<object> RegisterAsync(int programId, ProgramRegistrationDTO dto)
        {
            try
            {
                var program = await _programRepo.GetByIdAsync(programId);
                if (program == null) throw new KeyNotFoundException("Program not found");

                var registration = _mapper.Map<ProgramRegistration>(dto);
                registration.TeamProgramsId = programId;
                await _registrationRepo.AddAsync(registration);

                return new { Success = true, Message = "Registered successfully." };
            }
            catch (Exception ex)
            {
                _logger.LogError("Error registering for ProgramId {Id}: {Exception}", ex, programId);
                throw;
            }
        }
    }

}
