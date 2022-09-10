using API.DTOs.Request;
using API.DTOs.Response;
using API.Entities;

namespace API.Interfaces.Quotation
{
    public interface IQuotationService
    {
        Task<bool> CreateQuotation(QuotationCreateReqDto createQuotationDto);
        Task<QuotationResDto> GetQuotation(int quotationId);
        Task<List<QuotationResDto>> GetQuotations(int procurementId);
    }
}
