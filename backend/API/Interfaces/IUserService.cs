using API.DTOs.Request;
using API.DTOs.Response;

namespace API.Interfaces
{
    public interface IUserService
    {
        Task<UserResDto> GetUserById(int id);

        Task<SupplierResDto> GetSupplierById(int id);

        Task<UserResDto> UpdateUserProfile(UserProfileUpdateReqDto userProfileUpdateReqDto);

        Task<SupplierResDto> UpdateSupplierProfile(
            SupplierProfileUpdateReqDto supplierProfileUpdateReqDto
        );

        Task UpdateSupplierPassword(PasswordUpdateReqDto passwordUpdateReqDto);

        Task UpdateUserPassword(PasswordUpdateReqDto passwordUpdateReqDto);
    }
}
