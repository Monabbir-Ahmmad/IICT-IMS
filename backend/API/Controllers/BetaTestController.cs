using System.Net.Http.Headers;
using API.Database;
using API.DTOs.Params;
using API.Extensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BetaTestController : ControllerBase
    {
        private readonly DatabaseContext _context;

        public BetaTestController(DatabaseContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult> Get([FromQuery] PaginatedFilterSortParam param)
        {
            var products = _context.InventoryProducts
                .Include(x => x.Product)
                .ThenInclude(x => x.Category)
                .AsQueryable();

            if (
                param.SearchColumn != null
                && param.SearchValue != null
                && param.SearchOperator != null
            )
            {
                products = products.Where(
                    param.SearchColumn,
                    param.SearchOperator,
                    param.SearchValue
                );
            }

            if (param.SortColumn != null && param.SortDirection != null)
            {
                products = products.OrderBy(param.SortColumn, param.SortDirection == "asc");
            }

            if (param.PageNumber > 0 && param.PageSize > 0)
            {
                products = products
                    .Skip((param.PageNumber - 1) * param.PageSize)
                    .Take(param.PageSize);
            }

            return Ok(await products.ToListAsync());
        }
    }
}
