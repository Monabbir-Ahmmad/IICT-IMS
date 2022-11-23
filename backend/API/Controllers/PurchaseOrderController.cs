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
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class PurchaseOrderController : ControllerBase
    {
        private readonly IPurchaseOrderService _purchaseOrderService;

        public PurchaseOrderController(IPurchaseOrderService purchaseOrderService)
        {
            _purchaseOrderService = purchaseOrderService;
        }

        [Authorize(
            UserRoleEnum.Admin,
            UserRoleEnum.Director,
            UserRoleEnum.OfficeManager,
            UserRoleEnum.OfficeOfficer
        )]
        [HttpPost("create")]
        public async Task<ActionResult<ProcurementResDto>> CreatePurchaseOrder(
            PurchaseOrderCreateReqDto purchaseOrderCreateReqDto
        )
        {
            purchaseOrderCreateReqDto.CreatedById = (int)HttpContext.Items["userId"];
            return Created(
                "Purchase order created",
                await _purchaseOrderService.CreatePurchaseOrder(purchaseOrderCreateReqDto)
            );
        }

        [Authorize(
            UserRoleEnum.Admin,
            UserRoleEnum.Director,
            UserRoleEnum.OfficeManager,
            UserRoleEnum.OfficeOfficer
        )]
        [HttpDelete("{id}")]
        public async Task<ActionResult<bool>> DeletePurchaseOrder(int id)
        {
            if (await _purchaseOrderService.DeletePurchaseOrder(id))
                return Ok("Purchase order deleted");
            else
                throw new BadRequestException("Failed to delete purchase order.");
        }

        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<ActionResult<PurchaseOrderResDto>> GetPurchaseOrder(int id)
        {
            return await _purchaseOrderService.GetPurchaseOrder(id);
        }

        [AllowAnonymous]
        [HttpGet()]
        public async Task<ActionResult<PaginatedResDto<PurchaseOrderResDto>>> GetPurchaseOrders(
            [FromQuery] PaginatedFilterSortParam param
        )
        {
            return await _purchaseOrderService.GetPurchaseOrders(param);
        }

        [Authorize(UserRoleEnum.Admin, UserRoleEnum.Supplier)]
        [HttpGet("order-request")]
        public async Task<ActionResult<PaginatedResDto<PurchaseOrderResDto>>> GetOrderRequests(
            [FromQuery] PaginatedFilterSortParam param
        )
        {
            var supplierId = HttpContext.Items["userId"] as int? ?? 0;
            return await _purchaseOrderService.GetOrderRequests(supplierId, param);
        }

        [Authorize(UserRoleEnum.Admin, UserRoleEnum.Supplier)]
        [HttpGet("order-request/{id}")]
        public async Task<ActionResult<PurchaseOrderResDto>> GetOrderRequest(int id)
        {
            var supplierId = HttpContext.Items["userId"] as int? ?? 0;
            return await _purchaseOrderService.GetOrderRequest(id, supplierId);
        }

        [Authorize(UserRoleEnum.Admin, UserRoleEnum.Supplier)]
        [HttpPost("order-received")]
        public async Task<ActionResult<PurchaseOrderResDto>> ConfirmOrderRequestReceive(
            OrderRequestReceiveConfirmDto orderReceiveConfirmDto
        )
        {
            return await _purchaseOrderService.ConfrimOrderRequestReceive(orderReceiveConfirmDto);
        }

        [Authorize(
            UserRoleEnum.Admin,
            UserRoleEnum.Director,
            UserRoleEnum.OfficeManager,
            UserRoleEnum.OfficeOfficer
        )]
        [HttpPost("delivery/receive")]
        public async Task<ActionResult<PurchaseOrderResDto>> ConfirmDeliveryReceive(
            [FromForm] DeliveryConfirmReqDto deliveryConfirmReqDto
        )
        {
            return await _purchaseOrderService.ConfirmDeliveryReceive(deliveryConfirmReqDto);
        }
    }
}
