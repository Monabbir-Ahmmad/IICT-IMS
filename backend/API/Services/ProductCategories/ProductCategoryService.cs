using API.Database;
using API.DTOs.Response;
using API.Entities;
using API.Interfaces.ProductCategory;
using Microsoft.EntityFrameworkCore;

namespace API.Services.ProductCategories
{
    public class ProductCategoryService : IProductCategoryService
    {
        private readonly DatabaseContext _context;

        public ProductCategoryService(DatabaseContext context)
        {
            _context = context;
        }

        public async Task<ProductCategoryResponseDto> CreateCategory(string categoryName)
        {
            if (_context.ProductCategories.Where(x => x.Name == categoryName).Any())
                return null;

            var category = new ProductCategory() { Name = categoryName };

            _context.ProductCategories.Add(category);
            await _context.SaveChangesAsync();

            return new ProductCategoryResponseDto { Id = category.Id, Name = category.Name };
        }

        public async Task<bool> DeleteCategory(int categoryId)
        {
            var category = await _context.ProductCategories
                .Where(x => x.Id == categoryId)
                .FirstOrDefaultAsync();

            if (category == null)
            {
                return false;
            }

            _context.ProductCategories.Remove(category);
            var result = await _context.SaveChangesAsync();
            return result > 0;
        }

        public async Task<List<ProductCategoryResponseDto>> GetCategories()
        {
            List<ProductCategoryResponseDto> categories = new List<ProductCategoryResponseDto>();

            var categoryList = await _context.ProductCategories.ToListAsync();

            foreach (var category in categoryList)
            {
                categories.Add(
                    new ProductCategoryResponseDto() { Id = category.Id, Name = category.Name }
                );
            }
            return categories;
        }

        public async Task<ProductCategoryResponseDto> GetCategory(int categoryId)
        {
            var category = await _context.ProductCategories
                .Where(x => x.Id == categoryId)
                .FirstOrDefaultAsync();
            if (category == null)
                return null;

            var categoryRes = new ProductCategoryResponseDto()
            {
                Id = category.Id,
                Name = category.Name
            };
            return categoryRes;
        }
    }
}
