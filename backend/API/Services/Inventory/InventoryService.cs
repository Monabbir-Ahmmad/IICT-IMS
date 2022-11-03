using API.Database;
using API.DTOs.Request;
using API.DTOs.Response;
using API.Entities;
using API.Enums;
using API.Errors;
using API.Interfaces.Inventory;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace API.Services.Inventory
{
    public class InventoryService : IInventoryService
    {
        private readonly DatabaseContext _context;
        private readonly IMapper _mapper;

        public InventoryService(DatabaseContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task DistributeProducts(DistributionReqDto distributionReqDto)
        {
            var distributionTo = await _context.Users.FindAsync(distributionReqDto.DistributedToId);

            if (distributionTo == null)
                throw new BadRequestException("User for distribution not found");

            var distribution = new Distribution
            {
                DistributedTo = distributionTo,
                DistributionDate = distributionReqDto.DistributionDate,
                DistributionRoom = distributionReqDto.DistributionRoom,
                Products = new List<InventoryProduct>()
            };

            foreach (var product in distributionReqDto.Products)
            {
                var inventoryProduct = await _context.InventoryProducts.FindAsync(product.Id);

                if (inventoryProduct == null)
                    throw new BadRequestException("Product not found");

                if (inventoryProduct.Status != StatusEnum.InInventory)
                    throw new BadRequestException("Product is not in inventory");

                inventoryProduct.Status = StatusEnum.Distributed;

                _context.InventoryProducts.Update(inventoryProduct);

                distribution.Products.Add(inventoryProduct);
            }

            await _context.Distributions.AddAsync(distribution);
            await _context.SaveChangesAsync();

            return;
        }

        public async Task<List<InventoryProductResDto>> GetDistributableProducts()
        {
            var products = await _context.InventoryProducts
                .Where(p => p.Status == StatusEnum.InInventory)
                .Include(p => p.Product)
                .ThenInclude(p => p.Category)
                .ToListAsync();

            return _mapper.Map<List<InventoryProductResDto>>(products);
        }

        public async Task<InventoryProductResDto> GetProduct(int id)
        {
            var product = await _context.InventoryProducts
                .Where(p => p.Id == id)
                .FirstOrDefaultAsync();

            return _mapper.Map<InventoryProductResDto>(product);
        }

        public async Task<List<InventoryProductResDto>> GetProducts()
        {
            var products = await _context.InventoryProducts
                .Include(x => x.Product)
                .ThenInclude(x => x.Category)
                .Where(x => x.Status != null)
                .ToListAsync();

            return _mapper.Map<List<InventoryProductResDto>>(products);
        }

        public Task<List<InventoryProductResDto>> GetReceivableProducts()
        {
            var products = _context.InventoryProducts
                .Where(p => p.Status == StatusEnum.Distributed)
                .Include(p => p.Product)
                .ThenInclude(p => p.Category)
                .ToListAsync();

            return _mapper.Map<Task<List<InventoryProductResDto>>>(products);
        }
    }
}
