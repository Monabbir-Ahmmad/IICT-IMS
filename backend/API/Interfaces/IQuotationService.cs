using API.DTOs.Params;
using API.DTOs.Request;
using API.DTOs.Response;

namespace API.Interfaces
{
    public interface IQuotationService
    {
        Task<ProcurementResDto> CreateQuotation(QuotationCreateReqDto createQuotationDto);
        Task<QuotationResDto> GetQuotation(int quotationId);
        Task<PaginatedResDto<QuotationResDto>> GetQuotations(
            int procurementId,
            PaginatedFilterSortParam param
        );

        Task<PaginatedResDto<ProcurementResDto>> GetProcurementRequests(
            int supplierId,
            PaginatedFilterSortParam param
        );
    }
}
