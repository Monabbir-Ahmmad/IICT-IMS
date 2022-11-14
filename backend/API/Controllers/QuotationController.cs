using API.DTOs.Request;
using API.DTOs.Response;
using API.Enums;
using API.Interfaces.Quotation;
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

        [HttpGet()]
        public async Task<ActionResult<List<QuotationResDto>>> GetQuotations(int procurementId)
        {
            return Ok(await _quotationService.GetQuotations(procurementId));
        }

        [HttpGet("procurement-requests")]
        public async Task<ActionResult<List<ProcurementResDto>>> GetProcurementRequests()
        {
            int supplierId = (int)HttpContext.Items["userId"];
            return Ok(await _quotationService.GetProcurementRequests(supplierId));
        }
    }
}
