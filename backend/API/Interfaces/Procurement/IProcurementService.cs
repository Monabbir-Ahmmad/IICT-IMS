using API.DTOs.Request;
using API.DTOs.Response;

namespace API.Interfaces.Procurement
{
    public interface IProcurementService
    {
        Task<ProcurementResDto> CreateProcurement(ProcurementReqDto procuremnetDto);
        Task<bool> DeleteProcurement(int id);

        Task<List<ProcurementResDto>> GetProcurements(ProcurementsGetParams procurementsGetParams);

        Task<ProcurementResDto> GetProcurement(int id);
    }
}
