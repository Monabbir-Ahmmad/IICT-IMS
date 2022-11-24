using API.DTOs.Params;
using API.DTOs.Request;
using API.DTOs.Response;

namespace API.Interfaces
{
    public interface IDistributionService
    {
        Task<PaginatedResDto<InventoryProductResDto>> GetDistributableProducts(
            PaginatedFilterSortParam param
        );

        Task DistributeProducts(DistributionReqDto distributionReqDto);

        Task<PaginatedResDto<DistributionResDto>> GetDistributionHistory(
            PaginatedFilterSortParam param
        );

        Task<DistributionResDto> GetDistribution(int id);
    }
}
