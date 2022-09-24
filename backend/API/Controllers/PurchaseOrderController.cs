using API.DTOs.Request;
using API.DTOs.Response;
using API.Errors;
using API.Interfaces.PurchaseOrder;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PurchaseOrderController : ControllerBase
    {
        private readonly IPurchaseOrderService _purchaseOrderService;

        public PurchaseOrderController(IPurchaseOrderService purchaseOrderService)
        {
            _purchaseOrderService = purchaseOrderService;
        }

        [HttpPost("create")]
        public async Task<ActionResult<ProcurementResDto>> CreatePurchaseOrder(
            PurchaseOrderCreateReqDto purchaseOrderCreateReqDto
        )
        {
            return Created(
                "Purchase order created",
                await _purchaseOrderService.CreatePurchaseOrder(purchaseOrderCreateReqDto)
            );
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<bool>> DeletePurchaseOrder(int id)
        {
            if (await _purchaseOrderService.DeletePurchaseOrder(id))
                return Ok("Purchase order deleted");
            else
                throw new BadRequestException("Failed to delete purchase order.");
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<PurchaseOrderResDto>> GetPurchaseOrder(int id)
        {
            return await _purchaseOrderService.GetPurchaseOrder(id);
        }

        [HttpGet()]
        public async Task<ActionResult<List<PurchaseOrderResDto>>> GetPurchaseOrders()
        {
            return await _purchaseOrderService.GetPurchaseOrders();
        }

        [HttpPost("delivery")]
        public async Task<ActionResult<PurchaseOrderResDto>> DeliverPurchaseOrderProducts(
            PurchaseOrderDeliveryReqDto purchaseOrderDeliveryReqDto
        )
        {
            return await _purchaseOrderService.DeliverPurchaseOrderProducts(
                purchaseOrderDeliveryReqDto
            );
        }

        [HttpPost("delivery/receive")]
        public async Task<ActionResult<PurchaseOrderResDto>> ConfirmDeliveryReceive(
            int purchaseOrderId
        )
        {
            return await _purchaseOrderService.ConfirmDeliveryReceive(purchaseOrderId);
        }
    }
}
