using API.DTOs.Params;
using API.DTOs.Request;
using API.DTOs.Response;

namespace API.Interfaces
{
    public interface IPurchaseOrderService
    {
        Task<ProcurementResDto> CreatePurchaseOrder(
            PurchaseOrderCreateReqDto purchaseOrderCreateReqDto
        );

        Task<bool> DeletePurchaseOrder(int id);

        Task<PurchaseOrderResDto> GetPurchaseOrder(int id);

        Task<PaginatedResDto<PurchaseOrderResDto>> GetPurchaseOrders(
            PaginatedFilterSortParam param
        );
        Task<PaginatedResDto<PurchaseOrderResDto>> GetOrderRequests(
            int supplierId,
            PaginatedFilterSortParam param
        );

        Task<PurchaseOrderResDto> GetOrderRequest(int id, int supplierId);

        Task<PurchaseOrderResDto> DeliverPurchaseOrderProducts(
            PurchaseOrderDeliveryReqDto purchaseOrderDeliveryReqDto
        );

        Task<PurchaseOrderResDto> ConfirmDeliveryReceive(int purchaseOrderId);
    }
}
