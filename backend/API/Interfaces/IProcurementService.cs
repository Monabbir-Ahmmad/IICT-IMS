using API.DTOs.Params;
using API.DTOs.Request;
using API.DTOs.Response;

namespace API.Interfaces
{
    public interface IProcurementService
    {
        Task<ProcurementResDto> CreateProcurement(ProcurementReqDto procuremnetDto);
        Task<bool> DeleteProcurement(int id);

        Task<PaginatedResDto<ProcurementResDto>> GetProcurements(PaginatedFilterSortParam param);

        Task<ProcurementResDto> GetProcurement(int id);
    }
}
