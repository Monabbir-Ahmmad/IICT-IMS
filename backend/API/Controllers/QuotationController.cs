using API.DTOs.Params;
using API.DTOs.Request;
using API.DTOs.Response;
using API.Enums;
using API.Interfaces;
using API.Utilities;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize(UserRoleEnum.Admin, UserRoleEnum.Supplier)]
    [ApiController]
    [Route("api/supplier/[controller]")]
    public class QuotationController : ControllerBase
    {
        private readonly IQuotationService _quotationService;

        public QuotationController(IQuotationService quotationService)
        {
            _quotationService = quotationService;
        }

        [HttpPost("create")]
        public async Task<ActionResult<bool>> CreateQuotation(
            QuotationCreateReqDto createQuotationDto
        )
        {
            createQuotationDto.SupplierId = (int)HttpContext.Items["userId"];
            return Ok(await _quotationService.CreateQuotation(createQuotationDto));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<QuotationResDto>> GetQuotation(int id)
        {
            return Ok(await _quotationService.GetQuotation(id));
        }

        [HttpGet("procurement/{procurementId}")]
        public async Task<ActionResult<PaginatedResDto<QuotationResDto>>> GetQuotations(
            int procurementId,
            [FromQuery] PaginatedFilterSortParam param
        )
        {
            return Ok(await _quotationService.GetQuotations(procurementId, param));
        }

        [HttpGet("procurement-requests")]
        public async Task<ActionResult<PaginatedResDto<ProcurementResDto>>> GetProcurementRequests(
            [FromQuery] PaginatedFilterSortParam param
        )
        {
            var supplierId = (int)HttpContext.Items["userId"];
            return Ok(await _quotationService.GetProcurementRequests(supplierId, param));
        }
    }
}
