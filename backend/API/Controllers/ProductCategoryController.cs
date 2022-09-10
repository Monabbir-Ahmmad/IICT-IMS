using API.DTOs.Response;
using API.Interfaces.ProductCategory;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductCategoryController : ControllerBase
    {
        private readonly IProductCategoryService _productCategoryService;
        private readonly ILogger<ProductCategoryController> _logger;

        public ProductCategoryController(
            IProductCategoryService productCategoryService,
            ILogger<ProductCategoryController> logger
        )
        {
            _productCategoryService = productCategoryService;
            _logger = logger;
        }

        [HttpPost("create")]
        public async Task<ActionResult<ProductCategoryResDto>> CreateCategory(string categoryName)
        {
            try
            {
                var result = await _productCategoryService.CreateCategory(categoryName);

                return result != null
                    ? Created("Category created", result)
                    : BadRequest("Category already exists");
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

        [HttpDelete("{id}")]
        public async Task<ActionResult<bool>> DeleteCategory(int id)
        {
            try
            {
                var result = await _productCategoryService.DeleteCategory(id);
                return result ? Ok("Category Deleted") : BadRequest("Category does not exist");
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

        [HttpGet("{id}")]
        public async Task<ActionResult<ProductCategoryResDto>> GetCategory(int id)
        {
            try
            {
                var category = await _productCategoryService.GetCategory(id);
                return Ok(category);
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

        [HttpGet()]
        public async Task<ActionResult<List<ProductCategoryResDto>>> GetCategories()
        {
            try
            {
                var categories = await _productCategoryService.GetCategories();
                return categories;
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
