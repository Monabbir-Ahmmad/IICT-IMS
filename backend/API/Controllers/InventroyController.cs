using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs.Response;
using API.Interfaces.Inventory;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class InventroyController : ControllerBase
    {
        private readonly IInventoryService _inventoryService;

        public InventroyController(IInventoryService inventoryService)
        {
            _inventoryService = inventoryService;
        }

        [HttpGet()]
        public async Task<ActionResult<List<InventoryProductResDto>>> GetProductsInInventroy()
        {
            return await _inventoryService.GetProductsInInventory();
        }
    }
}
