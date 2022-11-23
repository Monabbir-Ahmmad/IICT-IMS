using API.DTOs.Params;
using API.DTOs.Request;
using API.DTOs.Response;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DistributionController : ControllerBase
    {
        private readonly IDistributionService _distributionService;

        public DistributionController(IDistributionService distributionService)
        {
            _distributionService = distributionService;
        }

        [HttpGet("distributable")]
        public async Task<
            ActionResult<PaginatedResDto<InventoryProductResDto>>
        > GetDistributableProducts([FromQuery] PaginatedFilterSortParam param)
        {
            return await _distributionService.GetDistributableProducts(param);
        }

        [HttpPost("distribute")]
        public async Task<IActionResult> DistributeProducts(DistributionReqDto distributionReqDto)
        {
            distributionReqDto.DistributorId = HttpContext.Items["userId"] as int? ?? 0;
            await _distributionService.DistributeProducts(distributionReqDto);

            return NoContent();
        }

        [HttpGet("history")]
        public async Task<ActionResult<PaginatedResDto<DistributionResDto>>> GetDistributionHistory(
            [FromQuery] PaginatedFilterSortParam param
        )
        {
            return await _distributionService.GetDistributionHistory(param);
        }

        [HttpGet("history/{id}")]
        public async Task<ActionResult<DistributionResDto>> GetDistribution(int id)
        {
            return await _distributionService.GetDistribution(id);
        }
    }
}
