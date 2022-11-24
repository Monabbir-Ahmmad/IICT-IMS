using API.DTOs.Response;
using API.Entities;

namespace API.Interfaces
{
    public interface IAutoCompleteService
    {
        Task<List<ProductCategoryResDto>> GetProductCategories();
        Task<List<UserRoleResDto>> GetUserRoles();
        Task<List<UserResDto>> GetUsers();
        Task<List<Product>> GetProducts(int categoryId);
    }
}
