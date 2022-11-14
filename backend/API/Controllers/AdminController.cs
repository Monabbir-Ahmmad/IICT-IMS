using API.DTOs.Response;
using API.Enums;
using API.Interfaces.Admin;
using API.Utilities;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize(UserRoleEnum.Admin, UserRoleEnum.Director)]
    [ApiController]
    [Route("api/[controller]")]
    public class AdminController : ControllerBase
    {
        private readonly IAdminService _adminService;

        public AdminController(IAdminService adminService)
        {
            _adminService = adminService;
        }

        [HttpGet("pending-counts")]
        public async Task<ActionResult<PendingCountsResDto>> GetPendingCounts()
        {
            return Ok(await _adminService.GetPendingCounts());
        }

        [HttpGet("pending-users")]
        public async Task<ActionResult<List<UserResDto>>> GetPendingUsers()
        {
            return await _adminService.GetPendingUsers();
        }

        [HttpPut("approve-user/{id}")]
        public async Task<IActionResult> ApproveUser(int id)
        {
            await _adminService.ApproveUser(id);

            return NoContent();
        }

        [HttpGet("pending-suppliers")]
        public async Task<ActionResult<List<SupplierResDto>>> GetPendingSuppliers()
        {
            return await _adminService.GetPendingSuppliers();
        }

        [HttpPut("approve-supplier/{id}")]
        public async Task<IActionResult> ApproveSupplier(int id)
        {
            await _adminService.ApproveSupplier(id);

            return NoContent();
        }

        [HttpDelete("reject-user/{id}")]
        public async Task<IActionResult> RejectUser(int id)
        {
            await _adminService.DeleteUser(id);

            return NoContent();
        }

        [HttpDelete("reject-supplier/{id}")]
        public async Task<IActionResult> RejectSupplier(int id)
        {
            await _adminService.DeleteSupplier(id);

            return NoContent();
        }

        [HttpGet("pending-procurements")]
        public async Task<ActionResult<List<ProcurementResDto>>> GetPendingProcurements()
        {
            return await _adminService.GetPendingProcurements();
        }

        [HttpPut("approve-procurement/{id}")]
        public async Task<IActionResult> ApproveProcurement(int id)
        {
            await _adminService.ApproveProcurement(id);

            return NoContent();
        }

        [HttpDelete("reject-procurement/{id}")]
        public async Task<IActionResult> RejectProcurement(int id)
        {
            await _adminService.DeleteProcurement(id);

            return NoContent();
        }

        [HttpGet("pending-purchase-orders")]
        public async Task<ActionResult<List<PurchaseOrderResDto>>> GetPendingPurchaseOrders()
        {
            return await _adminService.GetPendingPurchaseOrders();
        }

        [HttpPut("approve-purchase-order/{id}")]
        public async Task<IActionResult> ApprovePurchaseOrder(int id)
        {
            await _adminService.ApprovePurchaseOrder(id);

            return NoContent();
        }
    }
}
