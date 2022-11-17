using API.DTOs.Request;
using API.DTOs.Response;

namespace API.Interfaces
{
    public interface IQuotationService
    {
        Task<ProcurementResDto> CreateQuotation(QuotationCreateReqDto createQuotationDto);
        Task<QuotationResDto> GetQuotation(int quotationId);
        Task<List<QuotationResDto>> GetQuotations(int procurementId);

        Task<List<ProcurementResDto>> GetProcurementRequests(int supplierId);
    }
}
