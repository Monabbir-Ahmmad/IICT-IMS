using API.DTOs.Request;
using API.DTOs.Response;

namespace API.Interfaces.PurchaseOrder
{
    public class PurchaseOrderService : IPurchaseOrderService
    {
        public Task<ProcurementResDto> CreatePurchaseOrder(
            PurchaseOrderCreateReqDto purchaseOrderCreateReqDto
        )
        {
            throw new NotImplementedException();
        }

        public Task<bool> DeletePurchaseOrder(int id)
        {
            throw new NotImplementedException();
        }

        public Task<PurchaseOrderResDto> GetPurchaseOrder(int id)
        {
            throw new NotImplementedException();
        }

        public Task<List<PurchaseOrderResDto>> GetPurchaseOrders()
        {
            throw new NotImplementedException();
        }

        public Task<PurchaseOrderResDto> DeliverPurchaseOrderProducts(
            PurchaseOrderDeliveryReqDto purchaseOrderDeliveryReqDto
        )
        {
            throw new NotImplementedException();
        }

        public Task<PurchaseOrderResDto> ConfirmDeliveryReceive(int purchaseOrderId)
        {
            throw new NotImplementedException();
        }
    }
}
