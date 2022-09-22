using System.Net;
using API.Database;
using API.DTOs.Request;
using API.DTOs.Response;
using API.Entities;
using API.Errors;
using API.Interfaces.Procurement;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace API.Services.Procurements
{
    public class ProcurementService : IProcurementService
    {
        private readonly DatabaseContext _context;
        private readonly IMapper _mapper;

        public ProcurementService(DatabaseContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<ProcurementResDto> CreateProcurement(ProcurementReqDto procurementReqDto)
        {
            var procurementCategory = await _context.ProductCategories
                .Where(x => x.Id == procurementReqDto.ProcurementCategoryId)
                .FirstOrDefaultAsync();

            if (procurementCategory == null)
                throw new NotFoundException("Procurement category not found.");

            var procurement = new Procurement
            {
                Title = procurementReqDto.Title,
                Category = procurementCategory,
                EstimatedTotalPrice = procurementReqDto.EstimatedTotalPrice,
                Deadline = procurementReqDto.Deadline,
                Products = procurementReqDto.Products.ConvertAll<ProcurementProduct>(
                    x =>
                        new ProcurementProduct
                        {
                            Name = x.Name,
                            Category = procurementCategory,
                            Manufacturer = x.Manufacturer,
                            Details = x.Details,
                            EstimatedPrice = x.EstimatedPrice,
                            Quantity = x.Quantity,
                            EstimatedTotalPrice = x.EstimatedTotalPrice
                        }
                )
            };

            _context.Procurements.Add(procurement);
            await _context.SaveChangesAsync();

            var procurementResDto = _mapper.Map<ProcurementResDto>(procurement);

            return procurementResDto;
        }

        public async Task<bool> DeleteProcurement(int id)
        {
            var procurement = await _context.Procurements.SingleOrDefaultAsync(x => x.Id == id);

            if (procurement == null)
                throw new NotFoundException("Procurement not found.");

            _context.Procurements.Remove(procurement);
            var result = await _context.SaveChangesAsync();

            return result > 0;
        }

        public async Task<ProcurementResDto> GetProcurement(int id)
        {
            var procurement = await _context.Procurements
                .Where(x => x.Id == id)
                .Include(x => x.Category)
                .Include(x => x.Products)
                .ThenInclude(x => x.Category)
                .Include(x => x.Quotations)
                .ThenInclude(x => x.Supplier)
                .ThenInclude(s => s.Category)
                .FirstOrDefaultAsync();

            if (procurement == null)
                throw new NotFoundException("Procurement not found.");

            var procurementResDto = _mapper.Map<ProcurementResDto>(procurement);

            return procurementResDto;
        }

        public async Task<List<ProcurementResDto>> GetProcurements(
            ProcurementsGetParams procurementsGetParams
        )
        {
            var procurementList = new List<Procurement>();

            IQueryable<Procurement> procurements = _context.Procurements.Include(x => x.Category);
            if (procurementsGetParams?.CategoryId > 0)
            {
                procurements = procurements.Where(
                    x => x.Category.Id == procurementsGetParams.CategoryId
                );
            }

            procurementList = await procurements
                .Include(x => x.Quotations)
                .ThenInclude(x => x.Supplier)
                .ToListAsync();

            var procurementListResDto = _mapper.Map<List<ProcurementResDto>>(procurementList);

            return procurementListResDto;
        }

        public async Task<ProcurementResDto> AcceptProcurementQuotation(
            QuotationAcceptReqDto quotationAcceptReqDto
        )
        {
            if (
                await _context.Quotations.AnyAsync(
                    x =>
                        x.Procurement.Id == quotationAcceptReqDto.ProcurementId
                        && x.Accepted == true
                )
            )
                throw new ApiException(
                    HttpStatusCode.Conflict,
                    "A quotation has already been selected for this procurement."
                );

            var quotation = await _context.Quotations.SingleOrDefaultAsync(
                x =>
                    x.Id == quotationAcceptReqDto.QuotationId
                    && x.Procurement.Id == quotationAcceptReqDto.ProcurementId
            );

            if (quotation == null)
                throw new NotFoundException("Quotation not found.");

            quotation.Accepted = true;
            quotation.DeliveryDeadline = quotationAcceptReqDto.DeliveryDeadline;

            _context.Quotations.Update(quotation);
            await _context.SaveChangesAsync();

            return await GetProcurement(quotationAcceptReqDto.ProcurementId);
        }
    }
}
