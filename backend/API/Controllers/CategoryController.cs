using API.Interfaces.Category;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryService _categoryService;
        private readonly ILogger<AuthController> _logger;

        public CategoryController(ICategoryService categoryService, ILogger<AuthController> logger)
        {
            _categoryService = categoryService;
            _logger = logger;
        }

        [HttpPost("create")]
        public async Task<ActionResult<bool>> CreateCategory(string categoryName)
        {
            try
            {
                var result = await _categoryService.CreateCategory(categoryName);

                return result ? Ok("Category created") : BadRequest("Category already exists");
            }
            catch (Exception ex)
            {
                _logger.LogError("{ErrorMessage}", ex.Message);

                return StatusCode(
                    StatusCodes.Status500InternalServerError,
                    new { response = "Something went wrong." }
                );
            }
        }
    }
}
