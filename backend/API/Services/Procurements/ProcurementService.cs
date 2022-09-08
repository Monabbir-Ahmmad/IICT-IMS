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

        public Task<bool> DeleteProcurement(int id)
        {
            throw new NotImplementedException();
        }

        public Task<ProcurementResponseDto> GetProcurement(int id)
        {
            throw new NotImplementedException();
        }

        public Task<List<ProcurementResponseDto>> GetProcurements()
        {
            throw new NotImplementedException();
        }
    }
}
