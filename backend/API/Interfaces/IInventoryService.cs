using API.DTOs.Params;
using API.DTOs.Request;
using API.DTOs.Response;

namespace API.Interfaces
{
    public interface IInventoryService
    {
        Task<PaginatedResDto<InventoryProductResDto>> GetProducts(PaginatedFilterSortParam param);

        Task<InventoryProductResDto> GetProduct(int id);

        Task<InventoryProductResDto> UpdateProductStatus(
            InventoryProductStatusUpdateReqDto product
        );
    }
}
