using API.Database;
using API.DTOs.Request;
using API.DTOs.Response;
using API.Entities;
using API.Interfaces.Quotation;
using Microsoft.EntityFrameworkCore;

namespace API.Services.Quotations
{
    public class QuotationService : IQuotationService
    {
        private readonly DatabaseContext _context;

        public QuotationService(DatabaseContext context)
        {
            _context = context;
        }

        public async Task<bool> CreateQuotation(CreateQuotationDto createQuotationDto)
        {
            var procurement = await _context.Procurements
                .Where(x => x.Id == createQuotationDto.ProcurementId)
                .Include(x => x.Category)
                .FirstOrDefaultAsync();

            if (procurement.Quotations.Any(x => x.Id == createQuotationDto.SupplierId))
            {
                return false;
            }

            var supplier = await _context.Suppliers
                .Where(x => x.Id == createQuotationDto.SupplierId)
                .FirstOrDefaultAsync();

            var quotation = new Quotation
            {
                Procurement = procurement,
                Supplier = supplier,
                QuotedTotalPrice = createQuotationDto.QuotedTotalPrice
            };

            await _context.Quotations.AddAsync(quotation);
            var created = await _context.SaveChangesAsync();

            return created > 0;
        }

        public async Task<QuotationResponseDto> GetQuotation(int quotationId)
        {
            var quotation = await _context.Quotations
                .Include(q => q.Procurement)
                .Include(q => q.Supplier)
                .FirstOrDefaultAsync(q => q.Id == quotationId);

            if (quotation == null)
                return null;

            var quotationResponseDto = new QuotationResponseDto
            {
                Id = quotation.Id,
                ProcurementId = quotation.Procurement.Id,
                ProcurementName = quotation.Procurement.Title,
                SupplierId = quotation.Supplier.Id,
                SupplierName = quotation.Supplier.CompanyName,
                QuotedTotalPrice = quotation.QuotedTotalPrice
            };

            return quotationResponseDto;
        }

        public async Task<List<QuotationResponseDto>> GetQuotations(int procurementId)
        {
            var quotations = await _context.Quotations
                .Include(q => q.Procurement)
                .Include(q => q.Supplier)
                .Where(q => q.Procurement.Id == procurementId)
                .ToListAsync();

            if (quotations == null)
                return null;

            var quotationResponseDtos = new List<QuotationResponseDto>();

            foreach (var quotation in quotations)
            {
                var quotationResponseDto = new QuotationResponseDto
                {
                    Id = quotation.Id,
                    ProcurementId = quotation.Procurement.Id,
                    ProcurementName = quotation.Procurement.Title,
                    SupplierId = quotation.Supplier.Id,
                    SupplierName = quotation.Supplier.CompanyName,
                    QuotedTotalPrice = quotation.QuotedTotalPrice
                };

                quotationResponseDtos.Add(quotationResponseDto);
            }

            return quotationResponseDtos;
        }
    }
}
