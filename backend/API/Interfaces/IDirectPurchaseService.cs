using API.DTOs.Params;
using API.DTOs.Request;
using API.DTOs.Response;

namespace API.Interfaces
{
    public interface IDirectPurchaseService
    {
        Task CreateDirectPurchase(DirectPurchaseCreateReqDto directPurchaseDto);

        Task<PaginatedResDto<DirectPurchaseResDto>> GetDirectPurchases(
            PaginatedFilterSortParam param
        );

        Task<DirectPurchaseResDto> GetDirectPurchase(int id);
    }
}
