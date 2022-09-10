using API.DTOs.Request;
using API.DTOs.Response;
using API.Entities;

namespace API.Interfaces.Quotation
{
    public interface IQuotationService
    {
        Task<bool> CreateQuotation(CreateQuotationDto createQuotationDto);
        Task<QuotationResponseDto> GetQuotation(int quotationId);
        Task<List<QuotationResponseDto>> GetQuotations(int procurementId);
    }
}
