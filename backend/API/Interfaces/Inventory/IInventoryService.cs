using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs.Response;

namespace API.Interfaces.Inventory
{
    public interface IInventoryService
    {
        Task<List<InventoryProductResDto>> GetProductsInInventory();
    }
}
