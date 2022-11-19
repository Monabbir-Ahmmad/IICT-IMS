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

        [HttpGet("distributable")]
        public async Task<
            ActionResult<PaginatedResDto<InventoryProductResDto>>
        > GetDistributableProducts([FromQuery] PaginatedFilterSortParam param)
        {
            return await _inventoryService.GetDistributableProducts(param);
        }

        [HttpGet("receivable")]
        public async Task<
            ActionResult<PaginatedResDto<InventoryProductResDto>>
        > GetReceivableProducts([FromQuery] PaginatedFilterSortParam param)
        {
            return await _inventoryService.GetReceivableProducts(param);
        }

        [HttpPost("distribute")]
        public async Task<IActionResult> DistributeProducts(DistributionReqDto distributionReqDto)
        {
            distributionReqDto.DistributorId = HttpContext.Items["userId"] as int? ?? 0;
            await _inventoryService.DistributeProducts(distributionReqDto);

            return NoContent();
        }

        [HttpGet("distribution-history")]
        public async Task<ActionResult<PaginatedResDto<DistributionResDto>>> GetDistributionHistory(
            [FromQuery] PaginatedFilterSortParam param
        )
        {
            return await _inventoryService.GetDistributionHistory(param);
        }

        [HttpPost("receive-return")]
        public async Task<IActionResult> ReceiveReturnProducts(
            ReceiveReturnReqDto receiveReturnReqDto
        )
        {
            receiveReturnReqDto.ReceiverId = HttpContext.Items["userId"] as int? ?? 0;
            await _inventoryService.ReceiveProducts(receiveReturnReqDto);

            return NoContent();
        }

        [HttpGet("receive-return-history")]
        public async Task<
            ActionResult<PaginatedResDto<ReceiveReturnResDto>>
        > GetReceiveReturnHistory([FromQuery] PaginatedFilterSortParam param)
        {
            return await _inventoryService.GetReceiveHistory(param);
        }

        [HttpGet("product/{id}")]
        public async Task<ActionResult<InventoryProductResDto>> GetInventoryProduct(int id)
        {
            return await _inventoryService.GetProduct(id);
        }
    }
}
