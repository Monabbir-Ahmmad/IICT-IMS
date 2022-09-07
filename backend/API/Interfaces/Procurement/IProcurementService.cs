using API.DTOs.Request;
using API.DTOs.Response;

namespace API.Interfaces.Procurement
{
    public interface IProcurementService
    {
        Task<ProcurementResponseDto> CreateProcurement(ProcuremnetDto procuremnetDto);
        Task<bool> DeleteProcurement(int id);

        Task<List<ProcurementResponseDto>> GetProcurements();

        Task<ProcurementResponseDto> GetProcurement(int id);

    }
}
