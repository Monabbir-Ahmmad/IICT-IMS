using System.ComponentModel.DataAnnotations;
using API.DTOs.Response;
using API.Errors;
using API.Interfaces.ProductCategory;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductCategoryController : ControllerBase
    {
        private readonly IProductCategoryService _productCategoryService;

        public ProductCategoryController(IProductCategoryService productCategoryService)
        {
            _productCategoryService = productCategoryService;
        }

        [HttpPost("create")]
        public async Task<ActionResult<ProductCategoryResDto>> CreateCategory(
            [Required] string name
        )
        {
            return Created("Category created", await _productCategoryService.CreateCategory(name));
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<bool>> DeleteCategory(int id)
        {
            var result = await _productCategoryService.DeleteCategory(id);
            return result ? Ok("Category Deleted.") : throw new BadRequestException();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ProductCategoryResDto>> GetCategory(int id)
        {
            return await _productCategoryService.GetCategory(id);
        }

        [HttpGet()]
        public async Task<ActionResult<List<ProductCategoryResDto>>> GetCategories()
        {
            return await _productCategoryService.GetCategories();
        }
    }
}
