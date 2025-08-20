using AutoMapper;
using Microsoft.Extensions.Configuration;
using SoccerClub.Application.DTOs;
using SoccerClub.Application.Interfaces;
using SoccerClub.Core.Entities;
using SoccerClub.Core.Interfaces;

namespace SoccerClub.Application.Services
{
    public class MediaService : IMediaService
    {
        private readonly IGenericRepository<Media> _mediaRepository;
        private readonly IMapper _mapper;
        private readonly IAppLogger<MediaService> _logger;
        private readonly string _uploadsRoot;

        public MediaService(
            IGenericRepository<Media> mediaRepository,
            IMapper mapper,
            IAppLogger<MediaService> logger,
            IConfiguration configuration)
        {
            _mediaRepository = mediaRepository;
            _mapper = mapper;
            _logger = logger;

            // Path: appsettings.json -> "Media:UploadsPath": "wwwroot/media"
            _uploadsRoot = configuration["Media:UploadsPath"]
                           ?? Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "media");

            if (!Directory.Exists(_uploadsRoot))
                Directory.CreateDirectory(_uploadsRoot);
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

            // Save file with unique name
            string fileName = $"{Guid.NewGuid()}{Path.GetExtension(uploadDto.File.FileName)}";
            string filePath = Path.Combine(_uploadsRoot, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await uploadDto.File.CopyToAsync(stream);
            }

            // Create entity
            var media = new Media
            {
                FileName = fileName,
                MediaUrl = $"/media/{fileName}", // relative path
                MediaType = uploadDto.File.ContentType,
                AltText = uploadDto.AltText,
                CreatedAt = DateTime.UtcNow,
                //CreatedBy = uploadDto.CreatedBy
            };

            await _mediaRepository.AddAsync(media);

            _logger.LogInformation("Media uploaded successfully: {FileName}", fileName);

            return _mapper.Map<MediaDTO>(media);
        }

        public async Task DeleteMediaAsync(int id)
        {
            var media = await _mediaRepository.GetByIdAsync(id);
            if (media == null) return;

            // delete physical file
            var filePath = Path.Combine(_uploadsRoot, media.FileName);
            if (File.Exists(filePath))
                File.Delete(filePath);

            await _mediaRepository.DeleteAsync(id);

            _logger.LogInformation("Media deleted successfully: {MediaId}", id);
        }
    }
}
