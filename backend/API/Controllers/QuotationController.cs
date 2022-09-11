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

        private readonly ILogger<QuotationController> _logger;

        public QuotationController(
            IQuotationService quotationService,
            ILogger<QuotationController> logger
        )
        {
            _quotationService = quotationService;
            _logger = logger;
        }

        [HttpPost("create")]
        public async Task<ActionResult<bool>> CreateQuotation(
            QuotationCreateReqDto createQuotationDto
        )
        {
            try
            {
                var result = await _quotationService.CreateQuotation(createQuotationDto);

                return result ? Ok("Quotation created") : BadRequest("Quotation not be created");
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
        public async Task<ActionResult<QuotationResDto>> GetQuotation(int id)
        {
            try
            {
                var result = await _quotationService.GetQuotation(id);

                return result != null ? Ok(result) : BadRequest("Quotation not found");
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
        public async Task<ActionResult<List<QuotationResDto>>> GetQuotations(int procurementId)
        {
            try
            {
                var result = await _quotationService.GetQuotations(procurementId);

                return Ok(result);
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
