using AutoMapper;
using Microsoft.Extensions.Logging;
using SoccerClub.Core.Entities;
using SoccerClub.Core.Interfaces;
using SoccerClub.Application.DTOs;
using SoccerClub.Application.Interfaces;

namespace SoccerClub.Application.Services
{
    public class ProductService : IProductService
    {
        private readonly IGenericRepository<Product> _repo;
        private readonly IMapper _mapper;
        private readonly ILogger<ProductService> _logger;

        public ProductService(
            IGenericRepository<Product> repo,
            IMapper mapper,
            ILogger<ProductService> logger)
        {
            _repo = repo;
            _mapper = mapper;
            _logger = logger;
        }

        // ✅ GET ALL
        public async Task<IEnumerable<ProductDTO>> GetAllProductsAsync()
        {
            _logger.LogInformation("Fetching all products");

            var products = await _repo.GetAllAsync(p => p.IsActive);

            return _mapper.Map<IEnumerable<ProductDTO>>(products);
        }

        // ✅ GET BY ID
        public async Task<ProductDTO?> GetProductByIdAsync(int id)
        {
            _logger.LogInformation("Fetching product {Id}", id);

            var product = await _repo.GetByIdAsync(id);

            if (product == null || !product.IsActive)
            {
                _logger.LogWarning("Product not found: {Id}", id);
                return null;
            }

            return _mapper.Map<ProductDTO>(product);
        }

        // ✅ CREATE
        public async Task<object> CreateProductAsync(ProductDTO dto)
        {
            _logger.LogInformation("Creating product {Name}", dto.Name);

            try
            {
                var existing = await _repo.FindAsync(p =>
                    p.Name.Trim().ToLower() == dto.Name.Trim().ToLower()
                );

                if (existing.Any())
                    throw new InvalidOperationException("Product already exists");

                var entity = _mapper.Map<Product>(dto);
                entity.IsActive = true;

                var id = await _repo.AddAsync(entity);

                return new
                {
                    Success = true,
                    Message = "Product created",
                    ProductId = id
                };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating product");
                throw;
            }
        }

        // ✅ UPDATE
        public async Task<object> UpdateProductAsync(int id, ProductDTO dto)
        {
            _logger.LogInformation("Updating product {Id}", id);

            try
            {
                var product = await _repo.GetByIdAsync(id);

                if (product == null)
                    throw new KeyNotFoundException("Product not found");

                product.Name = dto.Name;
                product.Price = dto.Price;
                product.ImageUrl = dto.ImageUrl;
                product.Category = dto.Category;

                var updatedId = await _repo.UpdateAsync(product);

                return new
                {
                    Success = true,
                    Message = "Product updated",
                    ProductId = updatedId
                };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating product {Id}", id);
                throw;
            }
        }

        // ✅ DELETE (soft delete)
        public async Task<bool> DeleteProductAsync(int id)
        {
            _logger.LogInformation("Deleting product {Id}", id);

            var product = await _repo.GetByIdAsync(id);

            if (product == null)
                return false;

            product.IsActive = false;

            await _repo.UpdateAsync(product);

            return true;
        }
    }
}