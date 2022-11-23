using API.DTOs.Request;
using API.DTOs.Response;

namespace API.Interfaces.PurchaseOrder
{
    public interface IPurchaseOrderService
    {
        Task<ProcurementResDto> CreatePurchaseOrder(
            PurchaseOrderCreateReqDto purchaseOrderCreateReqDto
        );

        Task<bool> DeletePurchaseOrder(int id);

        Task<PurchaseOrderResDto> GetPurchaseOrder(int id);

        Task<List<PurchaseOrderResDto>> GetPurchaseOrders();
        Task<List<PurchaseOrderResDto>> GetOrderRequests(int supplierId);

        Task<PurchaseOrderResDto> DeliverPurchaseOrderProducts(
            PurchaseOrderDeliveryReqDto purchaseOrderDeliveryReqDto
        );

        Task<PurchaseOrderResDto> ConfirmDeliveryReceive(int purchaseOrderId);
    }
}
