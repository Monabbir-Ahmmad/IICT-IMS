namespace API.Interfaces.Auth
{
    public interface ITokenService
    {
        string CreateRefreshToken(int id, string role);
        string CreateAccessToken(int id, string role);
        bool IsRefreshTokenExpired(string token);
        int GetUserIdFromToken(string token);
        string GetRoleFromToken(string token);
    }
}
