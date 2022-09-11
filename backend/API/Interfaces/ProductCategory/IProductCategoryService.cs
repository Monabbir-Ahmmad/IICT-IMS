using API.DTOs.Response;

namespace API.Interfaces.ProductCategory
{
    public interface IProductCategoryService
    {
        Task<ProductCategoryResDto> CreateCategory(string categoryName);
        Task<bool> DeleteCategory(int categoryId);
        Task<List<ProductCategoryResDto>> GetCategories();
        Task<ProductCategoryResDto> GetCategory(int categoryId);
    }
}
