using API.DTOs.Request;
using API.DTOs.Response;
using API.Interfaces.Quotation;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
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
    }
}
