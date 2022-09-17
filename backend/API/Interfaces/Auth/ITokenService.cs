namespace API.Interfaces.Auth
{
    public interface ITokenService
    {
        string CreateToken(int Id, string email, string role);
    }
}
