using API.Database;
using API.Entities;
using API.Interfaces.Category;

namespace API.Services.Categories
{
    public class CategoryService : ICategoryService
    {
        private readonly DatabaseContext _context;

        public CategoryService(DatabaseContext context)
        {
            _context = context;
        }

        public async Task<bool> CreateCategory(string categoryName)
        {
            if (_context.ProductCategories.Where(x => x.Name == categoryName).Any())
                return false;

            var category = new ProductCategory { Name = categoryName };

            _context.ProductCategories.Add(category);
            var result = await _context.SaveChangesAsync();

            return result > 0;
        }
        public async Task<CategoryResponseDto> GetCategories()
        {

        }

        public async Task<CategoryResponseDto> GetCategory(int categoryId)
        {

        }
    }
}
