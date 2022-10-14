using System.Net;
using API.Database;
using API.DTOs.Request;
using API.DTOs.Response;
using API.Entities;
using API.Errors;
using API.Interfaces.Quotation;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace API.Services.Quotations
{
    public class QuotationService : IQuotationService
    {
        private readonly DatabaseContext _context;
        private readonly IMapper _mapper;

        public QuotationService(DatabaseContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<ProcurementResDto> CreateQuotation(
            QuotationCreateReqDto quotationCreateReqDto
        )
        {
            if (
                await _context.Quotations.AnyAsync(
                    x =>
                        x.Procurement.Id == quotationCreateReqDto.ProcurementId
                        && x.Supplier.Id == quotationCreateReqDto.SupplierId
                )
            )
                throw new ApiException(HttpStatusCode.Conflict, "Quotation already offered.");

            var supplier = await _context.Suppliers
                .Where(x => x.Id == quotationCreateReqDto.SupplierId)
                .Include(x => x.Category)
                .FirstOrDefaultAsync();

            if (supplier == null)
                throw new NotFoundException("Supplier not found.");

            var procurement = await _context.Procurements
                .Where(x => x.Id == quotationCreateReqDto.ProcurementId)
                .Include(x => x.Category)
                .Include(x => x.Products)
                .ThenInclude(x => x.Product)
                .ThenInclude(x => x.Category)
                .Include(x => x.Quotations)
                .ThenInclude(x => x.Supplier)
                .ThenInclude(s => s.Category)
                .FirstOrDefaultAsync();

            if (procurement == null)
                throw new NotFoundException("Procurement not found.");

            var quotation = new Quotation
            {
                Supplier = supplier,
                QuotedTotalPrice = quotationCreateReqDto.QuotedTotalPrice
            };

            procurement.Quotations.Add(quotation);

            _context.Procurements.Update(procurement);
            await _context.SaveChangesAsync();

            return _mapper.Map<ProcurementResDto>(procurement);
        }

        public async Task<QuotationResDto> GetQuotation(int quotationId)
        {
            var quotation = await _context.Quotations
                .Where(q => q.Id == quotationId)
                .Include(q => q.Procurement)
                .Include(q => q.Supplier)
                .ThenInclude(s => s.Category)
                .FirstOrDefaultAsync();

            if (quotation == null)
                throw new NotFoundException("Quotation not found.");

            var quotationResDto = _mapper.Map<QuotationResDto>(quotation);

            return quotationResDto;
        }

        public async Task<List<QuotationResDto>> GetQuotations(int procurementId)
        {
            var quotations = await _context.Quotations
                .Include(q => q.Procurement)
                .Include(q => q.Supplier)
                .ThenInclude(s => s.Category)
                .Where(q => q.Procurement.Id == procurementId)
                .ToListAsync();

            var quotationListResDto = _mapper.Map<List<QuotationResDto>>(quotations);

            return quotationListResDto;
        }
    }
}
