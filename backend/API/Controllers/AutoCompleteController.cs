using API.DTOs.Response;
using API.Entities;
using API.Enums;
using API.Interfaces;
using API.Utilities;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class AutoCompleteController : ControllerBase
    {
        private readonly IAutoCompleteService _autoCompleteService;

        public AutoCompleteController(IAutoCompleteService autoCompleteService)
        {
            _autoCompleteService = autoCompleteService;
        }

        [AllowAnonymous]
        [HttpGet("public/productCategories")]
        public async Task<ActionResult<List<ProductCategoryResDto>>> GetProductCategories()
        {
            return await _autoCompleteService.GetProductCategories();
        }

        [AllowAnonymous]
        [HttpGet("public/userRoles")]
        public async Task<ActionResult<List<UserRoleResDto>>> GetUserRoles()
        {
            return await _autoCompleteService.GetUserRoles();
        }

        [Authorize(
            UserRoleEnum.Admin,
            UserRoleEnum.Director,
            UserRoleEnum.OfficeManager,
            UserRoleEnum.StoreManager,
            UserRoleEnum.OfficeOfficer,
            UserRoleEnum.StoreOfficer,
            UserRoleEnum.NormalEmployee
        )]
        [HttpGet("users")]
        public async Task<ActionResult<List<UserResDto>>> GetUsers()
        {
            return await _autoCompleteService.GetUsers();
        }

        [Authorize(
            UserRoleEnum.Admin,
            UserRoleEnum.Director,
            UserRoleEnum.OfficeManager,
            UserRoleEnum.StoreManager,
            UserRoleEnum.OfficeOfficer,
            UserRoleEnum.StoreOfficer,
            UserRoleEnum.NormalEmployee
        )]
        [HttpGet("products/{categoryId}")]
        public async Task<ActionResult<List<Product>>> GetProducts(int categoryId)
        {
            return await _autoCompleteService.GetProducts(categoryId);
        }
    }
}
