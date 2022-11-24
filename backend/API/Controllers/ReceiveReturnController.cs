using API.DTOs.Params;
using API.DTOs.Request;
using API.DTOs.Response;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ReceiveReturnController : ControllerBase
    {
        private readonly IReceiveReturnService _receiveReturnService;

        public ReceiveReturnController(IReceiveReturnService receiveReturnService)
        {
            _receiveReturnService = receiveReturnService;
        }

        [HttpGet("receivable")]
        public async Task<
            ActionResult<PaginatedResDto<InventoryProductResDto>>
        > GetReceivableProducts([FromQuery] PaginatedFilterSortParam param)
        {
            return await _receiveReturnService.GetReceivableProducts(param);
        }

        [HttpPost("receive-return")]
        public async Task<IActionResult> ReceiveReturnProducts(
            ReceiveReturnReqDto receiveReturnReqDto
        )
        {
            receiveReturnReqDto.ReceiverId = HttpContext.Items["userId"] as int? ?? 0;
            await _receiveReturnService.ReceiveProducts(receiveReturnReqDto);

            return NoContent();
        }

        [HttpGet("history")]
        public async Task<
            ActionResult<PaginatedResDto<ReceiveReturnResDto>>
        > GetReceiveReturnHistory([FromQuery] PaginatedFilterSortParam param)
        {
            return await _receiveReturnService.GetReceiveHistory(param);
        }

        [HttpGet("history/{id}")]
        public async Task<ActionResult<ReceiveReturnResDto>> GetReceiveReturn(int id)
        {
            return await _receiveReturnService.GetReceiveReturn(id);
        }
    }
}
