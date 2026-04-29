using Microsoft.AspNetCore.Mvc;
using SoccerClub.Application.DTOs;
using SoccerClub.Application.Interfaces;

namespace SoccerClub.Api.Controllers
{
    [ApiController]
    [Route("api/products")]
    public class ProductsController : ControllerBase
    {
        private readonly IProductService _service;
        private readonly ILogger<ProductsController> _logger;

        public ProductsController(
            IProductService service,
            ILogger<ProductsController> logger)
        {
            _service = service;
            _logger = logger;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllProducts()
        {
            try
            {
                _logger.LogInformation("GET /api/products called");

                var result = await _service.GetAllProductsAsync();

                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching products");
                return StatusCode(500, new { message = "Something went wrong" });
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetProductById(int id)
        {
            try
            {
                _logger.LogInformation("GET product by id {Id}", id);

                var result = await _service.GetProductByIdAsync(id);

                if (result == null)
                {
                    _logger.LogWarning("Product not found {Id}", id);
                    return NotFound();
                }

                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching product {Id}", id);
                return StatusCode(500, new { message = "Something went wrong" });
            }
        }

        [HttpPost]
        public async Task<IActionResult> CreateProduct(ProductDTO dto)
        {
            try
            {
                _logger.LogInformation("Creating product {Name}", dto.Name);

                var result = await _service.CreateProductAsync(dto);

                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating product {Name}", dto.Name);
                return StatusCode(500, new { message = "Something went wrong" });
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProduct(int id, ProductDTO dto)
        {
            try
            {
                _logger.LogInformation("Updating product {Id}", id);

                var result = await _service.UpdateProductAsync(id, dto);

                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating product {Id}", id);
                return StatusCode(500, new { message = "Something went wrong" });
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            try
            {
                _logger.LogInformation("Deleting product {Id}", id);

                var success = await _service.DeleteProductAsync(id);

                if (!success)
                {
                    _logger.LogWarning("Delete failed, product not found {Id}", id);
                    return NotFound();
                }

                return Ok(new { message = "Deleted successfully" });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting product {Id}", id);
                return StatusCode(500, new { message = "Something went wrong" });
            }
        }
    }
}