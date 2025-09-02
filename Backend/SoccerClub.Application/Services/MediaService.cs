using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using SoccerClub.Application.DTOs;
using SoccerClub.Application.Interfaces;
using SoccerClub.Core.Entities;
using SoccerClub.Core.Interfaces;
using System.Security.Claims;

namespace SoccerClub.Application.Services
{
    public class MediaService : IMediaService
    {
        private readonly IGenericRepository<Media> _mediaRepository;
        private readonly IMapper _mapper;
        private readonly IAppLogger<MediaService> _logger;
        private readonly string _uploadsRoot;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public MediaService(
            IGenericRepository<Media> mediaRepository,
            IMapper mapper,
            IAppLogger<MediaService> logger,
            IConfiguration configuration,
            IHttpContextAccessor httpContextAccessor)
        {
            _mediaRepository = mediaRepository;
            _mapper = mapper;
            _logger = logger;
            _httpContextAccessor = httpContextAccessor;

            // Path: appsettings.json -> "Media:UploadsPath": "wwwroot/media"
            _uploadsRoot = configuration["Media:UploadsPath"]
                           ?? Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads");

            if (!Directory.Exists(_uploadsRoot))
                Directory.CreateDirectory(_uploadsRoot);
        }

        public async Task<List<MediaDTO>> GetAllMedia()
        {
            var list = await _mediaRepository.GetAllAsync();
            return _mapper.Map<List<MediaDTO>>(list);

        }

        public async Task<MediaDTO?> GetMediaByIdAsync(int id)
        {
            var media = await _mediaRepository.GetByIdAsync(id);
            return media == null ? null : _mapper.Map<MediaDTO>(media);
        }

        public async Task<MediaDTO> UploadMediaAsync(MediaUploadDTO uploadDto)
        {
            if (uploadDto.File == null || uploadDto.File.Length == 0)
                throw new ArgumentException("Invalid file upload");

            // Keep original name
            string fileName = Path.GetFileName(uploadDto.File.FileName);

            // Generate unique file name to avoid overwrite
            // string uniqueFileName = $"{Guid.NewGuid()}{Path.GetExtension(uploadDto.File.FileName)}";
            string filePath = Path.Combine(_uploadsRoot, fileName);

            if (Directory.Exists(filePath))
                throw new Exception("File already exists.");

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await uploadDto.File.CopyToAsync(stream);
            }

            int.TryParse(_httpContextAccessor?.HttpContext?.User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value, out int currentUserId);

			// Create entity
			var media = new Media
            {
                FileName = fileName,   // Save original filename in DB
                MediaUrl = $"/uploads/{fileName}",
                MediaType = uploadDto.File.ContentType,
                AltText = uploadDto.AltText,
                IsActive = true,
                CreatedAt = DateTime.UtcNow,
                CreatedBy = currentUserId
			};

            await _mediaRepository.AddAsync(media);

            _logger.LogInformation("Media uploaded successfully: {FileName}", fileName);

            return _mapper.Map<MediaDTO>(media);
        }

        public async Task DeleteMediaAsync(int id)
        {
            var media = await _mediaRepository.GetByIdAsync(id);
            if (media == null) return;

            // Extract unique filename from URL
            string fileName = Path.GetFileName(media.MediaUrl);
            var filePath = Path.Combine(_uploadsRoot, fileName);

            if (File.Exists(filePath))
                File.Delete(filePath);

            await _mediaRepository.DeleteAsync(id);

            _logger.LogInformation("Media deleted successfully: {MediaId}", id);
        }
    }
}
