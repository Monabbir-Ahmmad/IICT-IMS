using API.Entities;

namespace API.Interfaces.Auth
{
    public interface ITokenService
    {
        string CreateToken(User user);
    }
}
