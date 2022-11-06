using API.DTOs.Request;
using API.DTOs.Response;
using API.Interfaces.Inventory;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
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
        public async Task<ActionResult<List<InventoryProductResDto>>> GetProducts()
        {
            return await _inventoryService.GetProducts();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<InventoryProductResDto>> GetProduct(int id)
        {
            return await _inventoryService.GetProduct(id);
        }

        [HttpGet("distributable")]
        public async Task<ActionResult<List<InventoryProductResDto>>> GetDistributableProducts()
        {
            return await _inventoryService.GetDistributableProducts();
        }

        [HttpGet("receivable")]
        public async Task<ActionResult<List<InventoryProductResDto>>> GetReceivableProducts()
        {
            return await _inventoryService.GetReceivableProducts();
        }

        [HttpPost("distribute")]
        public async Task<IActionResult> DistributeProducts(DistributionReqDto distributionReqDto)
        {
            distributionReqDto.DistributorId = HttpContext.Items["userId"] as int? ?? 0;
            await _inventoryService.DistributeProducts(distributionReqDto);

            return NoContent();
        }

        [HttpGet("product/{id}")]
        public async Task<ActionResult<InventoryProductResDto>> GetInventoryProduct(int id)
        {
            return await _inventoryService.GetProduct(id);
        }
    }
}
