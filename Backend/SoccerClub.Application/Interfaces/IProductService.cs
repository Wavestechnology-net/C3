using SoccerClub.Application.DTOs;

namespace SoccerClub.Application.Interfaces
{
    public interface IProductService
    {
        Task<IEnumerable<ProductDTO>> GetAllProductsAsync();
        Task<ProductDTO?> GetProductByIdAsync(int id);
        Task<object> CreateProductAsync(ProductDTO dto);
        Task<object> UpdateProductAsync(int id, ProductDTO dto);
        Task<bool> DeleteProductAsync(int id);
    }
}