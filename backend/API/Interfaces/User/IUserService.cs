using API.DTOs.Response;

namespace API.Interfaces.User
{
    public interface IUserService
    {
        Task<UserDetailsResDto> GetUserById(int id);

        Task<List<UserDetailsResDto>> GetUsers();
    }
}
