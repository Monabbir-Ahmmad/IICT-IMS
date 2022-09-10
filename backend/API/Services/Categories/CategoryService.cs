using API.Database;
using API.DTOs.Response;
using API.Entities;
using API.Interfaces.Category;
using Microsoft.EntityFrameworkCore;

namespace API.Services.Categories
{
    public class CategoryService : ICategoryService
    {
        private readonly DatabaseContext _context;

        public CategoryService(DatabaseContext context)
        {
            _context = context;
        }

        private int _categoryId = 1;

        public async Task<bool> CreateCategory(string categoryName)
        {
            if (_context.ProductCategories.Where(x => x.Name == categoryName).Any())
                return false;

            var category = new ProductCategory { Name = categoryName, Id = _categoryId++ };

            _context.ProductCategories.Add(category);
            var result = await _context.SaveChangesAsync();

            return result > 0;
        }

        public async Task<bool> DeleteCategory(int categoryId)
        {
            var category = await _context.ProductCategories.Where(x => x.Id == categoryId).FirstOrDefaultAsync();

            if (category == null)
            {
                return false;
            }

            _context.ProductCategories.Remove(category);
            var result = await _context.SaveChangesAsync();
            return result > 0;

        }

        public async Task<List<CategoryResponseDto>> GetCategories()
        {
            List<CategoryResponseDto> categories = new List<CategoryResponseDto>();

            var categoryList = await _context.ProductCategories.ToListAsync();

            foreach (var category in categoryList)
            {
                categories.Add(new CategoryResponseDto()
                {
                    Id = category.Id,
                    Name = category.Name
                });
            }
            return categories;
        }

        public async Task<CategoryResponseDto> GetCategory(int categoryId)
        {

            var category = await _context.ProductCategories.Where(x => x.Id == categoryId).FirstOrDefaultAsync();
            if (category == null)
                return null;

            var categoryRes = new CategoryResponseDto() { Id = category.Id, Name = category.Name };
            return categoryRes;
        }
    }
}
