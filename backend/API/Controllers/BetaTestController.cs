using API.Database;
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
        public async Task<ActionResult> Get(
            string propertyName,
            string comparison,
            string value,
            string sortBy,
            string sortDirection
        )
        {
            var products = _context.Products.AsQueryable();

            if (propertyName != null && comparison != null && value != null)
            {
                products = products.Where(propertyName, comparison, value);
            }

            if (sortBy != null)
            {
                products = products.OrderBy(sortBy, sortDirection == "desc");
            }

            return Ok(await products.ToListAsync());
        }
    }
}
