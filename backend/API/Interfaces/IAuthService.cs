using API.DTOs.Request;
using API.DTOs.Response;

namespace API.Interfaces
{
    public interface IAuthService
    {
        Task RegisterUser(RegisterReqDto registerDto);
        Task RegisterSupplier(SupplierRegisterReqDto supplierRegisterDto);
        Task<AuthResDto> LoginUser(LoginReqDto loginDto);
        Task<AuthResDto> LoginSupplier(LoginReqDto loginDto);
        Task<bool> UserExists(string email);
        Task<bool> SupplierExists(string BIN, string email, string companyName);

        Task ForgotPassword(ForgotPasswordReqDto forgotPasswordReqDto);

        Task<string> ResetPassword(string token);

        Task<AuthResDto> RefreshToken(string refreshToken);
    }
}
