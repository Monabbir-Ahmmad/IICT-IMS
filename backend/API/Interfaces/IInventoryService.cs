using API.DTOs.Params;
using API.DTOs.Request;
using API.DTOs.Response;

namespace API.Interfaces
{
    public interface IInventoryService
    {
        Task<PaginatedResDto<InventoryProductResDto>> GetProducts(PaginatedFilterSortParam param);

        Task<InventoryProductResDto> GetProduct(int id);

        Task<PaginatedResDto<InventoryProductResDto>> GetDistributableProducts(
            PaginatedFilterSortParam param
        );

        Task<PaginatedResDto<InventoryProductResDto>> GetReceivableProducts(
            PaginatedFilterSortParam param
        );

        Task DistributeProducts(DistributionReqDto distributionReqDto);

        Task ReceiveProducts(ReceiveReturnReqDto receiveReturnReqDto);

        Task<PaginatedResDto<DistributionResDto>> GetDistributionHistory(
            PaginatedFilterSortParam param
        );

        Task<PaginatedResDto<ReceiveReturnResDto>> GetReceiveHistory(
            PaginatedFilterSortParam param
        );
    }
}
