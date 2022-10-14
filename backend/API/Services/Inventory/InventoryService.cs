using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Database;
using API.DTOs.Response;
using API.Enums;
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

        public async Task<List<InventoryProductResDto>> GetProductsInInventory()
        {
            var products = await _context.InventoryProducts
                .Include(x => x.Product)
                .ThenInclude(x => x.Category)
                .Where(x => x.Status == StatusEnum.InInventory)
                .ToListAsync();

            return _mapper.Map<List<InventoryProductResDto>>(products);
        }
    }
}
