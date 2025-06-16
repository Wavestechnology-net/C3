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
    public class TryoutRegistrationService : ITryoutRegistration
    {
        private readonly IAppLogger<TryoutRegistrationService> _logger;
        private readonly IMapper _mapper;
        private readonly IGenericRepository<TryoutRegistration> _registrationRepo;
        private readonly IGenericRepository<Tryout> _tryoutRepo;

        public TryoutRegistrationService(
            IAppLogger<TryoutRegistrationService> logger,
            IMapper mapper,
            IGenericRepository<TryoutRegistration> registrationRepo,
            IGenericRepository<Tryout> tryoutRepo)
        {
            _logger = logger;
            _mapper = mapper;
            _registrationRepo = registrationRepo;
            _tryoutRepo = tryoutRepo;
        }

        public async Task<List<TryoutRegistrationDTO>> GetAllByTryoutIdAsync(int tryoutId)
        {
            try
            {
                var registrations = await _registrationRepo.GetByIdAsync(tryoutId);
                return _mapper.Map<List<TryoutRegistrationDTO>>(registrations);
            }
            catch (Exception ex)
            {
                _logger.LogError("Error retrieving registrations for tryout ID {TryoutId}: {Exception}", ex, tryoutId);
                throw;
            }
        }

        public async Task<object> CreateAsync(int tryoutId, TryoutRegistrationDTO dto)
        {
            try
            {
                var tryout = await _tryoutRepo.GetByIdAsync(tryoutId) ?? throw new KeyNotFoundException("Tryout not found");
                var registration = _mapper.Map<TryoutRegistration>(dto);
                registration.TryoutId = tryoutId;

                await _registrationRepo.AddAsync(registration);

                return new { Success = true, Message = "Player registered successfully." };
            }
            catch (Exception ex)
            {
                _logger.LogError("Error registering player for tryout ID {TryoutId}: {Exception}", ex, tryoutId);
                throw;
            }
        }
    }

}
