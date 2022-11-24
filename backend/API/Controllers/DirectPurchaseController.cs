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
        UserRoleEnum.StoreManager
    )]
    [ApiController]
    [Route("api/[controller]")]
    public class DirectPurchaseController : ControllerBase
    {
        private readonly IDirectPurchaseService _directPurchaseService;

        public DirectPurchaseController(IDirectPurchaseService directPurchaseService)
        {
            _directPurchaseService = directPurchaseService;
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreateDirectPurchase(
            [FromForm] DirectPurchaseCreateReqDto directPurchaseDto
        )
        {
            await _directPurchaseService.CreateDirectPurchase(directPurchaseDto);
            return Ok();
        }

        [HttpGet()]
        public async Task<ActionResult<PaginatedResDto<DirectPurchaseResDto>>> GetDirectPurchases(
            [FromQuery] PaginatedFilterSortParam param
        )
        {
            return await _directPurchaseService.GetDirectPurchases(param);
        }
    }
}
