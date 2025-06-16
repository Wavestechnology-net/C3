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
    public class TeamProgramService : ITeamProgram
    {
        private readonly IAppLogger<TeamProgramService> _logger;
        private readonly IMapper _mapper;
        private readonly IGenericRepository<TeamProgram> _programRepo;

        public TeamProgramService(IAppLogger<TeamProgramService> logger, IMapper mapper, IGenericRepository<TeamProgram> programRepo)
        {
            _logger = logger;
            _mapper = mapper;
            _programRepo = programRepo;
        }

        public async Task<List<TeamProgramDTO>> GetAllAsync()
        {
            try
            {
                var programs = await _programRepo.GetAllAsync();
                return _mapper.Map<List<TeamProgramDTO>>(programs);
            }
            catch (Exception ex)
            {
                _logger.LogError("Error getting all programs: {Exception}", ex);
                throw;
            }
        }

        public async Task<TeamProgramDTO> GetByIdAsync(int id)
        {
            try
            {
                var program = await _programRepo.GetByIdAsync(id);
                return _mapper.Map<TeamProgramDTO>(program);
            }
            catch (Exception ex)
            {
                _logger.LogError("Error getting program ID {Id}: {Exception}", ex, id);
                throw;
            }
        }

        public async Task<object> CreateAsync(TeamProgramDTO dto)
        {
            try
            {
                var entity = _mapper.Map<TeamProgram>(dto);
                await _programRepo.AddAsync(entity);
                return new { Success = true, Message = "Program created successfully." };
            }
            catch (Exception ex)
            {
                _logger.LogError("Error creating program: {Exception}", ex);
                throw;
            }
        }

        public async Task<object> UpdateAsync(int id, TeamProgramDTO dto)
        {
            try
            {
                var existing = await _programRepo.GetByIdAsync(id) ?? throw new KeyNotFoundException("Program not found");
                _mapper.Map(dto, existing);
                await _programRepo.UpdateAsync(existing);
                return new { Success = true, Message = "Program updated successfully." };
            }
            catch (Exception ex)
            {
                _logger.LogError("Error updating program ID {Id}: {Exception}", ex, id);
                throw;
            }
        }

        public async Task<object> DeleteAsync(int id)
        {
            try
            {
                var entity = await _programRepo.GetByIdAsync(id);
                if (entity == null) return new { Success = false, Message = "Program not found" };

                await _programRepo.DeleteAsync(entity);
                return new { Success = true, Message = "Program deleted successfully." };
            }
            catch (Exception ex)
            {
                _logger.LogError("Error deleting program ID {Id}: {Exception}", ex, id);
                throw;
            }
        }
    }

}
