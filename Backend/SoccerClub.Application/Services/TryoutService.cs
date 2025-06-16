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
    public class TryoutService : ITryout
    {
        private readonly IAppLogger<TryoutService> _logger;
        private readonly IMapper _mapper;
        private readonly IGenericRepository<Tryout> _tryoutRepository;

        public TryoutService(
            IAppLogger<TryoutService> logger,
            IMapper mapper,
            IGenericRepository<Tryout> tryoutRepository)
        {
            _logger = logger;
            _mapper = mapper;
            _tryoutRepository = tryoutRepository;
        }

        public async Task<List<TryoutDTO>> GetAllAsync()
        {
            try
            {
                var tryouts = await _tryoutRepository.GetAllAsync();
                return _mapper.Map<List<TryoutDTO>>(tryouts);
            }
            catch (Exception ex)
            {
                _logger.LogError("Error retrieving tryouts: {Exception}", ex);
                throw;
            }
        }

        public async Task<TryoutDTO> GetByIdAsync(int id)
        {
            try
            {
                var tryout = await _tryoutRepository.GetByIdAsync(id) ?? throw new KeyNotFoundException("Tryout not found");
                return _mapper.Map<TryoutDTO>(tryout);
            }
            catch (Exception ex)
            {
                _logger.LogError("Error retrieving tryout ID {TryoutId}: {Exception}", ex, id);
                throw;
            }
        }

        public async Task<object> CreateAsync(TryoutDTO dto)
        {
            try
            {
                var tryout = _mapper.Map<Tryout>(dto);
                await _tryoutRepository.AddAsync(tryout);
                return new { Success = true, Message = "Tryout created successfully." };
            }
            catch (Exception ex)
            {
                _logger.LogError("Error creating tryout: {Exception}", ex);
                throw;
            }
        }

        public async Task<object> UpdateAsync(int id, TryoutDTO dto)
        {
            try
            {
                var tryout = await _tryoutRepository.GetByIdAsync(id);
                if (tryout == null) throw new KeyNotFoundException("Tryout not found");

                _mapper.Map(dto, tryout);
                await _tryoutRepository.UpdateAsync(tryout);

                return new { Success = true, Message = "Tryout updated successfully." };
            }
            catch (Exception ex)
            {
                _logger.LogError("Error updating tryout ID {TryoutId}: {Exception}", ex, id);
                throw;
            }
        }

        public async Task<object> DeleteAsync(int id)
        {
            try
            {
                var tryout = await _tryoutRepository.GetByIdAsync(id);
                if (tryout == null)
                {
                    _logger.LogWarning("Tryout with ID {TryoutId} not found.", id);
                    return new { Success = false, Message = "Tryout not found." };
                }

                await _tryoutRepository.DeleteAsync(tryout);
                return new { Success = true, Message = "Tryout deleted successfully." };
            }
            catch (Exception ex)
            {
                _logger.LogError("Error deleting tryout ID {TryoutId}: {Exception}", ex, id);
                throw;
            }
        }
    }

}
