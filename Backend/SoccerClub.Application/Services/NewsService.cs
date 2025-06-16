using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Principal;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using SoccerClub.Application.DTOs;
using SoccerClub.Application.Interfaces;
using SoccerClub.Core.Entities;
using SoccerClub.Core.Interfaces;


namespace SoccerClub.Application.Services
{
    public class NewsService : INews
    {
        private readonly IAppLogger<NewsService> _logger;
        private readonly IMapper _mapper;
        private readonly IGenericRepository<News> _newsRepository;

        public NewsService(IAppLogger<NewsService> logger, IMapper mapper, IGenericRepository<News> accountRepository)
        {
            _logger = logger;
            _mapper = mapper;
            _newsRepository = accountRepository;
        }

        public async Task<object> AddNewsAsync(NewsDTO dto)
        {
            try
            {
                var news = _mapper.Map<News>(dto);
                await _newsRepository.AddAsync(news);

                return new { Success = true, Message = "News Added Successfully." };
            }
            catch (Exception ex)
            {
                _logger.LogError("Error adding account {AccountName}: {Exception}", ex, dto.Title);
                throw;
            }
        }

        public async Task<List<NewsDTO>> GetAllNewsAsync()
        {
            try
            {
                var news = await _newsRepository.GetAllAsync();
                return _mapper.Map<List<NewsDTO>>(news);
            }
            catch (Exception ex)
            {
                _logger.LogError("Error fetching news: {Exception}", ex);
                throw;
            }
        }

        public async Task<NewsDTO> GetNewsByIdAsync(int id)
        {
            try
            {
                var news = await _newsRepository.GetByIdAsync(id);
                return _mapper.Map<NewsDTO>(news);
            }
            catch (Exception ex)
            {
                _logger.LogError("Error fetching news with ID {NewsId}: {Exception}", ex, id);
                throw;
            }
        }

        public async Task UpdateNewsAsync(NewsDTO dto)
        {
            try
            {
                var news = _mapper.Map<News>(dto);
                await _newsRepository.UpdateAsync(news);
            }
            catch (Exception ex)
            {
                _logger.LogError("Error updating news with ID {NewsId}: {Exception}", ex, dto.NewsId);
                throw;
            }
        }

        public async Task DeleteNewsAsync(int id)
        {
            try
            {
                var news = await _newsRepository.GetByIdAsync(id);
                if (news == null)
                {
                    _logger.LogWarning("News with ID {NewsId} not found.", id);
                    return;
                }

                news.IsActive = false;
                await _newsRepository.UpdateAsync(news);
            }
            catch (Exception ex)
            {
                _logger.LogError("Error soft deleting account with ID {AccountId}: {Exception}", ex, id);
                throw;
            }
        }
    }
}
