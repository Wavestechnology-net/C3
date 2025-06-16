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
    public class StaffService : IStaff
    {
        private readonly IAppLogger<StaffService> _logger;
        private readonly IMapper _mapper;
        private readonly IGenericRepository<Staff> _staffRepo;

        public StaffService(IAppLogger<StaffService> logger, IMapper mapper, IGenericRepository<Staff> staffRepo)
        {
            _logger = logger;
            _mapper = mapper;
            _staffRepo = staffRepo;
        }

        public async Task<List<StaffDTO>> GetAllAsync()
        {
            try
            {
                var staff = await _staffRepo.GetAllAsync();
                return _mapper.Map<List<StaffDTO>>(staff);
            }
            catch (Exception ex)
            {
                _logger.LogError("Error getting staff list: {Exception}", ex);
                throw;
            }
        }

        public async Task<StaffDTO> GetByIdAsync(int id)
        {
            try
            {
                var staff = await _staffRepo.GetByIdAsync(id);
                return _mapper.Map<StaffDTO>(staff);
            }
            catch (Exception ex)
            {
                _logger.LogError("Error getting staff ID {Id}: {Exception}", ex, id);
                throw;
            }
        }

        public async Task<object> CreateAsync(StaffDTO dto)
        {
            try
            {
                var staff = _mapper.Map<Staff>(dto);
                await _staffRepo.AddAsync(staff);
                return new { Success = true, Message = "Staff created successfully." };
            }
            catch (Exception ex)
            {
                _logger.LogError("Error creating staff: {Exception}", ex);
                throw;
            }
        }

        public async Task<object> UpdateAsync(int id, StaffDTO dto)
        {
            try
            {
                var existing = await _staffRepo.GetByIdAsync(id);
                if (existing == null) throw new KeyNotFoundException("Staff not found");

                _mapper.Map(dto, existing);
                await _staffRepo.UpdateAsync(existing);
                return new { Success = true, Message = "Staff updated successfully." };
            }
            catch (Exception ex)
            {
                _logger.LogError("Error updating staff ID {Id}: {Exception}", ex, id);
                throw;
            }
        }

        public async Task<object> DeleteAsync(int id)
        {
            try
            {
                var staff = await _staffRepo.GetByIdAsync(id);
                if (staff == null) return new { Success = false, Message = "Staff not found" };

                await _staffRepo.DeleteAsync(staff);
                return new { Success = true, Message = "Staff deleted successfully." };
            }
            catch (Exception ex)
            {
                _logger.LogError("Error deleting staff ID {Id}: {Exception}", ex, id);
                throw;
            }
        }
    }

}
