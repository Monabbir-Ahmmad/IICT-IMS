using API.DTOs.Request;
using API.DTOs.Response;
using API.Errors;
using API.Interfaces.Procurement;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProcurementController : ControllerBase
    {
        private readonly IProcurementService _procurementService;

        public ProcurementController(IProcurementService procurementService)
        {
            _procurementService = procurementService;
        }

        [HttpPost("create")]
        public async Task<ActionResult<ProcurementResDto>> CreateProcurement(
            ProcurementReqDto procurementDto
        )
        {
            return Created(
                "Procurement created",
                await _procurementService.CreateProcurement(procurementDto)
            );
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<bool>> DeleteProcurement(int id)
        {
            if (await _procurementService.DeleteProcurement(id))
                return Ok("Procurement deleted");
            else
                throw new BadRequestException();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ProcurementResDto>> GetProcurementById(int id)
        {
            return await _procurementService.GetProcurement(id);
        }

        [HttpGet()]
        public async Task<ActionResult<List<ProcurementResDto>>> GetProcurements(
            [FromQuery] ProcurementsGetParams procurementsGetParams
        )
        {
            return await _procurementService.GetProcurements(procurementsGetParams);
        }

        [HttpPut("acceptQuotation")]
        public async Task<ActionResult<ProcurementResDto>> AcceptProcurementQuotation(
            QuotationAcceptReqDto quotationAcceptReqDto
        )
        {
            return await _procurementService.AcceptProcurementQuotation(quotationAcceptReqDto);
        }
    }
}
