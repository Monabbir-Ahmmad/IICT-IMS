using API.Database;
using API.DTOs.Request;
using API.DTOs.Response;
using API.Entities;
using API.Interfaces.Procurement;

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
            var procurementItems = new List<ProcurementItem>();

            foreach (var item in procuremnetDto.Items)
            {
                var procurementItem = new ProcurementItem
                {
                    Name = item.Name,
                    Category = item.Category,
                    Manufacturer = item.Manufacturer,
                    Details = item.Details,
                    EstimatedPrice = item.EstimatedPrice,
                    Quantity = item.Quantity,
                    EstimatedTotalPrice = item.EstimatedTotalPrice
                };

                procurementItems.Add(procurementItem);
            }

            var procurement = new Procurement
            {
                Name = procuremnetDto.Name,
                Category = procuremnetDto.Category,
                EstimatedTotalPrice = procuremnetDto.EstimatedTotalPrice,
                IssuingDate = procuremnetDto.IssuingDate,
                TenderDeadline = procuremnetDto.TenderDeadline,
                Items = procurementItems
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
