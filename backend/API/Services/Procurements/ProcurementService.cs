using API.Database;
using API.DTOs.Request;
using API.DTOs.Response;
using API.Entities;
using API.Interfaces.Procurement;
using Microsoft.EntityFrameworkCore;
using System.Net;

namespace API.Services.Procurements
{
    public class ProcurementService : IProcurementService
    {
        private readonly DatabaseContext _context;

        public ProcurementService(DatabaseContext context)
        {
            _context = context;
        }

        public async Task<bool> CreateProcurement(ProcuremnetDto procuremnetDto)
        {
            var procurementProducts = new List<ProcurementProduct>();

            var procurementCategory = await _context.ProductCategories
                .Where(x => x.Id == procuremnetDto.ProcuremnetCategoryId)
                .FirstOrDefaultAsync();

            if (procurementCategory == null)
                return false;

            foreach (var item in procuremnetDto.Products)
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
                Title = procuremnetDto.Title,
                Category = procurementCategory,
                EstimatedTotalPrice = procuremnetDto.EstimatedTotalPrice,
                IssuingDate = DateTime.Today,
                Deadline = procuremnetDto.TenderDeadline,
                Products = procurementProducts
            };

            _context.Procurements.Add(procurement);

            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<bool> DeleteProcurement(int id)
        {
            var procurement = await _context.Procurements
                .Where(x => x.Id == id)
                .FirstOrDefaultAsync();

            if (procurement == null)
                return false;
            else
            {
                _context.Procurements.Remove(procurement);
                return true;
            }
        }

        public async Task<ProcurementResponseDto> GetProcurement(int id)
        {
            var procurement = await _context.Procurements
                .Where(x => x.Id == id)
                .Include(x => x.Category)
                .Include(x => x.Products)
                .ThenInclude(x => x.Category)
                .FirstOrDefaultAsync();

            System.Diagnostics.Debug.Write(procurement);

            if (procurement == null)
            {
                return null;
            }
            else
            {
                var procurementResponse = new ProcurementResponseDto()
                {
                    Id = procurement.Id,
                    Title = procurement.Title,
                    Category = procurement.Category.Name,
                    IssuingDate = procurement.IssuingDate,
                    TenderDeadline = procurement.Deadline,
                    EstimatedTotalPrice = procurement.EstimatedTotalPrice,
                    Products = new List<ProcurementProductResponseDto>()

                };

                foreach (var item in procurement.Products)
                {
                    var procurementProduct = new ProcurementProductResponseDto()
                    {
                        Id = item.Id,
                        Name = item.Name,
                        Category = item.Category.Name,
                        Manufacturer = item.Manufacturer,
                        Details = item.Details,
                        EstimatedPrice = item.EstimatedPrice,
                        Quantity = item.Quantity,
                        EstimatedTotalPrice = item.EstimatedTotalPrice
                    };

                    procurementResponse.Products.Add(procurementProduct);
                }

                return procurementResponse;
            }
        }

        public Task<List<ProcurementResponseDto>> GetProcurements()
        {
            throw new NotImplementedException();
        }
    }
}
