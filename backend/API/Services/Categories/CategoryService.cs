using API.Database;
using API.Entities;
using API.Interfaces.Category;

namespace API.Services.Categories
{
    public class CategoryService: ICategoryService
    {
        private readonly DatabaseContext _context;

        public CategoryService(DatabaseContext context)
        {
            _context = context;
        }

        public async Task<bool> CreateCategory(string categoryName)
        {
            var category = new ProductCategory
            {
                Name = categoryName
            };

            _context.ProductCategories.Add(category);
            var result = await _context.SaveChangesAsync();

            return result > 0;
        }
    }
   
}
