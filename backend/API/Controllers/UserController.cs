using System.Net;
using API.DTOs.Request;
using API.DTOs.Response;
using API.Enums;
using API.Errors;
using API.Interfaces;
using API.Utilities;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [AllowAnonymous]
        [HttpGet("profile/{id}")]
        public async Task<ActionResult<UserResDto>> GetUser(int id)
        {
            return await _userService.GetUserById(id);
        }

        [AllowAnonymous]
        [HttpGet("supplier/profile/{id}")]
        public async Task<ActionResult<SupplierResDto>> GetSupplier(int id)
        {
            return await _userService.GetSupplierById(id);
        }

        [AllowAnonymous]
        [HttpPut("profile")]
        public async Task<ActionResult<UserResDto>> UpdateUserProfile(
            UserProfileUpdateReqDto userProfileUpdateReqDto
        )
        {
            if (HttpContext.Items["userRole"].ToString() == UserRoleEnum.Supplier.ToString())
                throw new ApiException(HttpStatusCode.Forbidden, "Forbidden");

            userProfileUpdateReqDto.Id = (int)HttpContext.Items["userId"];
            return await _userService.UpdateUserProfile(userProfileUpdateReqDto);
        }

        [Authorize(UserRoleEnum.Admin, UserRoleEnum.Supplier)]
        [HttpPut("supplier/profile")]
        public async Task<ActionResult<SupplierResDto>> UpdateSupplierProfile(
            SupplierProfileUpdateReqDto supplierProfileUpdateReqDto
        )
        {
            supplierProfileUpdateReqDto.Id = (int)HttpContext.Items["userId"];
            return await _userService.UpdateSupplierProfile(supplierProfileUpdateReqDto);
        }

        [AllowAnonymous]
        [HttpPut("password")]
        public async Task<ActionResult> UpdateUserPassword(
            PasswordUpdateReqDto passwordUpdateReqDto
        )
        {
            passwordUpdateReqDto.Id = (int)HttpContext.Items["userId"];

            if (HttpContext.Items["userRole"].ToString() == UserRoleEnum.Supplier)
                await _userService.UpdateSupplierPassword(passwordUpdateReqDto);
            else
                await _userService.UpdateUserPassword(passwordUpdateReqDto);
            return NoContent();
        }
    }
}
