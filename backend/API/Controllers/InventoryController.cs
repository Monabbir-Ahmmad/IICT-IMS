using API.DTOs.Params;
using API.DTOs.Request;
using API.DTOs.Response;
using API.Enums;
using API.Interfaces;
using API.Utilities;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize(
        UserRoleEnum.Admin,
        UserRoleEnum.Director,
        UserRoleEnum.OfficeManager,
        UserRoleEnum.OfficeOfficer,
        UserRoleEnum.StoreManager,
        UserRoleEnum.StoreOfficer,
        UserRoleEnum.NormalEmployee
    )]
    [ApiController]
    [Route("api/[controller]")]
    public class InventoryController : ControllerBase
    {
        private readonly IInventoryService _inventoryService;

        public InventoryController(IInventoryService inventoryService)
        {
            _inventoryService = inventoryService;
        }

        [HttpGet()]
        public async Task<ActionResult<PaginatedResDto<InventoryProductResDto>>> GetProducts(
            [FromQuery] PaginatedFilterSortParam param
        )
        {
            return await _inventoryService.GetProducts(param);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<InventoryProductResDto>> GetProduct(int id)
        {
            return await _inventoryService.GetProduct(id);
        }

        [HttpGet("product/{id}")]
        public async Task<ActionResult<InventoryProductResDto>> GetInventoryProduct(int id)
        {
            return await _inventoryService.GetProduct(id);
        }

        [HttpPut("product/status")]
        public async Task<ActionResult<InventoryProductResDto>> UpdateProductStatus(
            InventoryProductStatusUpdateReqDto product
        )
        {
            product.UserId = HttpContext.Items["userId"] as int? ?? 0;
            return await _inventoryService.UpdateProductStatus(product);
        }
    }
}
