using API.DTOs.Response;

namespace API.Interfaces.AutoComplete
{
    public interface IAutoCompleteService
    {
        Task<List<ProductCategoryResDto>> GetProductCategories();
        Task<List<UserRoleResDto>> GetUserRoles();
        Task<List<UserResDto>> GetUsers();
    }
}
