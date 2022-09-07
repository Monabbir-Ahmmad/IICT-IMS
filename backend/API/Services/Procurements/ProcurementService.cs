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

        public async Task<ProcurementResponseDto> CreateProcurement(ProcuremnetDto procuremnetDto)
        {
            var procurement = new Procurement
            {
                
            };

            
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
