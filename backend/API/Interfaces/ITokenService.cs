namespace API.Interfaces
{
    public interface ITokenService
    {
        string CreateRefreshToken(int id, string role);
        string CreateAccessToken(int id, string role);
        int? ValidateToken(string token, bool isRefreshToken = false);
        string GetRoleFromToken(string token);
    }
}
