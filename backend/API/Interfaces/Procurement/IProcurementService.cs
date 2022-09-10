using API.DTOs.Request;
using API.DTOs.Response;

namespace API.Interfaces.Procurement
{
    public interface IProcurementService
    {
        Task<bool> CreateProcurement(ProcuremnetDto procuremnetDto);
        Task<bool> DeleteProcurement(int id);

        Task<List<ProcurementResponseDto>> GetProcurements(GetProcurementsDto getProcurementsDto);

        Task<ProcurementResponseDto> GetProcurement(int id);
    }
}
