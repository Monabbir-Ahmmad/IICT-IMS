using API.DTOs.Request;
using API.DTOs.Response;

namespace API.Interfaces.Quotation
{
    public interface IQuotationService
    {
        Task<QuotationResDto> CreateQuotation(QuotationCreateReqDto createQuotationDto);
        Task<QuotationResDto> GetQuotation(int quotationId);
        Task<List<QuotationResDto>> GetQuotations(int procurementId);
    }
}
