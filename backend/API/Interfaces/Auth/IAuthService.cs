using API.DTOs.Request;
using API.DTOs.Response;
using Microsoft.AspNetCore.Mvc;

namespace API.Interfaces.Auth
{
    public interface IAuthService
    {
        Task<AuthResponseDto> RegisterUser(RegisterDto registerDto);
        Task<AuthResponseDto> LoginUser(LoginDto loginDto);
        Task<bool> UserExists(string email);
        Task<bool> PasswordMatch(string username, string password);
    }
}
