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

        [HttpGet("productCategories")]
        public async Task<ActionResult<List<ProductCategoryResDto>>> GetProductCategories()
        {
            return await _autoCompleteService.GetProductCategories();
        }

        [HttpGet("userRoles")]
        public async Task<ActionResult<List<UserRoleResDto>>> GetUserRoles()
        {
            return await _autoCompleteService.GetUserRoles();
        }
    }
}
