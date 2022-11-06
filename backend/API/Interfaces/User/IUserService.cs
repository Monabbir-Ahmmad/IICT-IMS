using API.DTOs.Response;

namespace API.Interfaces.User
{
    public interface IUserService
    {
        Task<UserResDto> GetUserById(int id);

        Task<List<UserResDto>> GetUsers();
    }
}
