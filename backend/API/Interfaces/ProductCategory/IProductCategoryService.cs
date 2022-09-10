using API.DTOs.Response;

namespace API.Interfaces.ProductCategory
{
    public interface IProductCategoryService
    {
        Task<ProductCategoryResponseDto> CreateCategory(string categoryName);
        Task<bool> DeleteCategory(int categoryId);
        Task<List<ProductCategoryResponseDto>> GetCategories();
        Task<ProductCategoryResponseDto> GetCategory(int categoryId);
    }
}
