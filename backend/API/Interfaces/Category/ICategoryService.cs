using API.Entities;

namespace API.Interfaces.Category
{
    public interface ICategoryService
    {
        Task<bool> CreateCategory(string categoryName);
        // Task<bool> DeleteCategory(int categoryId);
        // Task<CategoryResponseDto> GetCategory(int categoryId);
        
        // Task
        
    }
}
