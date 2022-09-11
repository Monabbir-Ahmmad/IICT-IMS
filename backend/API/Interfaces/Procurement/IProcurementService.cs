using API.DTOs.Request;
using API.DTOs.Response;

namespace API.Interfaces.Procurement
{
    public interface IProcurementService
    {
        Task<bool> CreateProcurement(ProcurementReqDto procuremnetDto);
        Task<bool> DeleteProcurement(int id);

        Task<List<ProcurementResDto>> GetProcurements(ProcurementsGetReqDto getProcurementsDto);

        Task<ProcurementResDto> GetProcurement(int id);
    }
}
