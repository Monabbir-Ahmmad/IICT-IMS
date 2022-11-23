using API.DTOs.Params;
using API.DTOs.Request;
using API.DTOs.Response;
using API.Enums;
using API.Errors;
using API.Interfaces;
using API.Utilities;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize(
        UserRoleEnum.Admin,
        UserRoleEnum.Director,
        UserRoleEnum.OfficeManager,
        UserRoleEnum.OfficeOfficer
    )]
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
            procurementDto.CreatedById = (int)HttpContext.Items["userId"];
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

        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<ActionResult<ProcurementResDto>> GetProcurementById(int id)
        {
            return await _procurementService.GetProcurement(id);
        }

        [AllowAnonymous]
        [HttpGet()]
        public async Task<ActionResult<PaginatedResDto<ProcurementResDto>>> GetProcurements(
            [FromQuery] PaginatedFilterSortParam param
        )
        {
            return await _procurementService.GetProcurements(param);
        }
    }
}
