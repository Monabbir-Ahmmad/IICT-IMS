using API.DTOs.Request;
using API.DTOs.Response;

namespace API.Interfaces.Auth
{
    public interface IAuthService
    {
        Task<AuthResDto> RegisterUser(RegisterReqDto registerDto);
        Task<AuthResDto> RegisterSupplier(SupplierRegisterReqDto supplierRegisterDto);
        Task<AuthResDto> LoginUser(LoginReqDto loginDto);
        Task<AuthResDto> LoginSupplier(LoginReqDto loginDto);
        Task<bool> UserExists(string email);
        Task<bool> SupplierExists(string BIN, string email, string companyName);
    }
}
