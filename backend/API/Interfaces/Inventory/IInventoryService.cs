using API.DTOs.Request;
using API.DTOs.Response;

namespace API.Interfaces.Inventory
{
    public interface IInventoryService
    {
        Task<List<InventoryProductResDto>> GetProducts();

        Task<List<InventoryProductResDto>> GetDistributableProducts();

        Task<List<InventoryProductResDto>> GetReceivableProducts();

        Task DistributeProducts(DistributionReqDto distributionReqDto);

        Task<InventoryProductResDto> GetProduct(int id);
    }
}
