using API.DTOs.Params;
using API.DTOs.Request;
using API.DTOs.Response;

namespace API.Interfaces
{
    public interface IReceiveReturnService
    {
        Task<PaginatedResDto<InventoryProductResDto>> GetReceivableProducts(
            PaginatedFilterSortParam param
        );

        Task ReceiveProducts(ReceiveReturnReqDto receiveReturnReqDto);

        Task<PaginatedResDto<ReceiveReturnResDto>> GetReceiveHistory(
            PaginatedFilterSortParam param
        );

        Task<ReceiveReturnResDto> GetReceiveReturn(int id);
    }
}
