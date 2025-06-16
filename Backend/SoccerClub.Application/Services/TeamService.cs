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
    public class TeamService : ITeam
    {
        private readonly IAppLogger<TeamService> _logger;
        private readonly IMapper _mapper;
        private readonly IGenericRepository<Team> _teamRepo;

        public TeamService(IAppLogger<TeamService> logger, IMapper mapper, IGenericRepository<Team> teamRepo)
        {
            _logger = logger;
            _mapper = mapper;
            _teamRepo = teamRepo;
        }

        public async Task<List<TeamDTO>> GetAllAsync()
        {
            try
            {
                var teams = await _teamRepo.GetAllAsync();
                return _mapper.Map<List<TeamDTO>>(teams);
            }
            catch (Exception ex)
            {
                _logger.LogError("Error getting teams: {Exception}", ex);
                throw;
            }
        }

        public async Task<TeamDTO> GetByIdAsync(int id)
        {
            try
            {
                var team = await _teamRepo.GetByIdAsync(id);
                return _mapper.Map<TeamDTO>(team);
            }
            catch (Exception ex)
            {
                _logger.LogError("Error getting team ID {Id}: {Exception}", ex, id);
                throw;
            }
        }

        public async Task<object> CreateAsync(TeamDTO dto)
        {
            try
            {
                var team = _mapper.Map<Team>(dto);
                await _teamRepo.AddAsync(team);
                return new { Success = true, Message = "Team created successfully." };
            }
            catch (Exception ex)
            {
                _logger.LogError("Error creating team: {Exception}", ex);
                throw;
            }
        }

        public async Task<object> UpdateAsync(int id, TeamDTO dto)
        {
            try
            {
                var existing = await _teamRepo.GetByIdAsync(id) ?? throw new KeyNotFoundException("Team not found");
                _mapper.Map(dto, existing);
                await _teamRepo.UpdateAsync(existing);
                return new { Success = true, Message = "Team updated successfully." };
            }
            catch (Exception ex)
            {
                _logger.LogError("Error updating team ID {Id}: {Exception}", ex, id);
                throw;
            }
        }

        public async Task<object> DeleteAsync(int id)
        {
            try
            {
                var team = await _teamRepo.GetByIdAsync(id);
                if (team == null) return new { Success = false, Message = "Team not found" };

                await _teamRepo.DeleteAsync(team);
                return new { Success = true, Message = "Team deleted successfully." };
            }
            catch (Exception ex)
            {
                _logger.LogError("Error deleting team ID {Id}: {Exception}", ex, id);
                throw;
            }
        }
    }

}
