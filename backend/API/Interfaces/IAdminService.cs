using API.DTOs.Response;

namespace API.Interfaces
{
    public interface IAdminService
    {
        Task<PendingCountsResDto> GetPendingCounts();

        Task<List<UserResDto>> GetPendingUsers();

        Task<List<SupplierResDto>> GetPendingSuppliers();

        Task<List<UserResDto>> GetVerifiedUsers();

        Task<List<SupplierResDto>> GetVerifiedSuppliers();

        Task ApproveUser(int userId);

        Task ApproveSupplier(int supplierId);

        Task ApproveProcurement(int procurementId);

        Task<List<ProcurementResDto>> GetPendingProcurements();

        Task ApprovePurchaseOrder(int purchaseOrderId);

        Task<List<PurchaseOrderResDto>> GetPendingPurchaseOrders();

        Task DeleteUser(int userId);

        Task DeleteSupplier(int supplierId);

        Task DeleteProcurement(int procurementId);

        Task DeletePurchaseOrder(int purchaseOrderId);
    }
}
