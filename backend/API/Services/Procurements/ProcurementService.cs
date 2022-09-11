using System.Net;
using API.Database;
using API.DTOs.Request;
using API.DTOs.Response;
using API.Entities;
using API.Interfaces.Procurement;
using Microsoft.EntityFrameworkCore;

namespace API.Services.Procurements
{
    public class ProcurementService : IProcurementService
    {
        private readonly DatabaseContext _context;

        public ProcurementService(DatabaseContext context)
        {
            _context = context;
        }

        public async Task<bool> CreateProcurement(ProcurementReqDto procurementDto)
        {
            var procurementProducts = new List<ProcurementProduct>();

            var procurementCategory = await _context.ProductCategories
                .Where(x => x.Id == procurementDto.ProcurementCategoryId)
                .FirstOrDefaultAsync();

            if (procurementCategory == null)
                return false;

            foreach (var item in procurementDto.Products)
            {
                var procurementItem = new ProcurementProduct
                {
                    Name = item.Name,
                    Category = procurementCategory,
                    Manufacturer = item.Manufacturer,
                    Details = item.Details,
                    EstimatedPrice = item.EstimatedPrice,
                    Quantity = item.Quantity,
                    EstimatedTotalPrice = item.EstimatedTotalPrice
                };

                procurementProducts.Add(procurementItem);
            }

            var procurement = new Procurement
            {
                Title = procurementDto.Title,
                Category = procurementCategory,
                EstimatedTotalPrice = procurementDto.EstimatedTotalPrice,
                IssuingDate = DateTime.Today,
                Deadline = procurementDto.TenderDeadline,
                Products = procurementProducts
            };

            _context.Procurements.Add(procurement);

            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<bool> DeleteProcurement(int id)
        {
            var procurement = await _context.Procurements.SingleOrDefaultAsync(x => x.Id == id);

            if (procurement == null)
                return false;

            _context.Procurements.Remove(procurement);
            await _context.SaveChangesAsync();
            return true;
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
                .FirstOrDefaultAsync();

            if (procurement == null)
            {
                return null;
            }
            else
            {
                var procurementResponse = new ProcurementResDto()
                {
                    Id = procurement.Id,
                    Title = procurement.Title,
                    Category = procurement.Category.Name,
                    IssuingDate = procurement.IssuingDate,
                    TenderDeadline = procurement.Deadline,
                    EstimatedTotalPrice = procurement.EstimatedTotalPrice,
                    Products = new List<ProcurementProductResponseDto>(),
                    Quotations = new List<QuotationResDto>()
                };

                foreach (var product in procurement.Products)
                {
                    procurementResponse.Products.Add(
                        new ProcurementProductResponseDto()
                        {
                            Id = product.Id,
                            Name = product.Name,
                            Category = product.Category.Name,
                            Manufacturer = product.Manufacturer,
                            Details = product.Details,
                            EstimatedPrice = product.EstimatedPrice,
                            Quantity = product.Quantity,
                            EstimatedTotalPrice = product.EstimatedTotalPrice
                        }
                    );
                }

                foreach (var quotation in procurement.Quotations)
                {
                    procurementResponse.Quotations.Add(
                        new QuotationResDto()
                        {
                            Id = quotation.Id,
                            SupplierId = quotation.Supplier.Id,
                            SupplierName = quotation.Supplier.CompanyName,
                            QuotedTotalPrice = quotation.QuotedTotalPrice,
                        }
                    );
                }

                return procurementResponse;
            }
        }

        public async Task<List<ProcurementResDto>> GetProcurements(
            ProcurementsGetReqDto getProcurementsDto
        )
        {
            var procurementList = new List<Procurement>();

            IQueryable<Procurement> procurements = _context.Procurements.Include(x => x.Category);
            if (getProcurementsDto?.Id > 0)
            {
                procurements = procurements.Where(x => x.Category.Id == getProcurementsDto.Id);
            }

            procurementList = await procurements
                .Include(x => x.Quotations)
                .ThenInclude(x => x.Supplier)
                .ToListAsync();

            var procurementListRes = new List<ProcurementResDto>();

            foreach (var procs in procurementList)
            {
                var procurementRes = new ProcurementResDto()
                {
                    Id = procs.Id,
                    Title = procs.Title,
                    Category = procs.Category.Name,
                    IssuingDate = procs.IssuingDate,
                    TenderDeadline = procs.Deadline,
                    EstimatedTotalPrice = procs.EstimatedTotalPrice,
                    Quotations = new List<QuotationResDto>()
                };

                foreach (var quotation in procs.Quotations)
                {
                    procurementRes.Quotations.Add(
                        new QuotationResDto()
                        {
                            Id = quotation.Id,
                            SupplierId = quotation.Supplier.Id,
                            QuotedTotalPrice = quotation.QuotedTotalPrice
                        }
                    );
                }

                procurementListRes.Add(procurementRes);
            }

            return procurementListRes;
        }
    }
}
