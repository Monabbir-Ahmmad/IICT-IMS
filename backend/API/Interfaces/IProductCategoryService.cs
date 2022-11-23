using API.DTOs.Request;
using API.DTOs.Response;

namespace API.Interfaces
{
    public interface IProductCategoryService
    {
        Task<ProductCategoryResDto> CreateCategory(string categoryName);
        Task DeleteCategory(int categoryId);
        Task<List<ProductCategoryResDto>> GetCategories();
        Task UpdateCategory(ProductCategoryUpdateReqDto categoryDto);
    }
}
