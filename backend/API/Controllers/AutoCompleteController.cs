using API.DTOs.Response;
using API.Interfaces.AutoComplete;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AutoCompleteController : ControllerBase
    {
        private readonly IAutoCompleteService _autoCompleteService;

        public AutoCompleteController(IAutoCompleteService autoCompleteService)
        {
            _autoCompleteService = autoCompleteService;
        }

        [HttpGet("public/productCategories")]
        public async Task<ActionResult<List<ProductCategoryResDto>>> GetProductCategories()
        {
            return await _autoCompleteService.GetProductCategories();
        }

        [HttpGet("public/userRoles")]
        public async Task<ActionResult<List<UserRoleResDto>>> GetUserRoles()
        {
            return await _autoCompleteService.GetUserRoles();
        }

        [HttpGet("users")]
        public async Task<ActionResult<List<UserResDto>>> GetUsers()
        {
            return await _autoCompleteService.GetUsers();
        }
    }
}
