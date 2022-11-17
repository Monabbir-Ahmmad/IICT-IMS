using API.DTOs.Request;
using API.DTOs.Response;

namespace API.Interfaces
{
    public interface IInventoryService
    {
        Task<List<InventoryProductResDto>> GetProducts();

        Task<InventoryProductResDto> GetProduct(int id);

        Task<List<InventoryProductResDto>> GetDistributableProducts();

        Task<List<InventoryProductResDto>> GetReceivableProducts();

        Task DistributeProducts(DistributionReqDto distributionReqDto);

        Task ReceiveProducts(ReceiveReturnReqDto receiveReturnReqDto);

        Task<List<DistributionResDto>> GetDistributionHistory();

        Task<List<ReceiveReturnResDto>> GetReceiveHistory();
    }
}
