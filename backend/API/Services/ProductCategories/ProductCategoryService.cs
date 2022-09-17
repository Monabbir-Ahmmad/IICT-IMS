using System.Net;
using API.Database;
using API.DTOs.Response;
using API.Entities;
using API.Errors;
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

        public async Task<ProductCategoryResDto> CreateCategory(string categoryName)
        {
            if (_context.ProductCategories.Where(x => x.Name == categoryName).Any())
                throw new ApiException(HttpStatusCode.Conflict, "Category already exists.");

            var category = new ProductCategory { Name = categoryName };

            _context.ProductCategories.Add(category);
            await _context.SaveChangesAsync();

            return new ProductCategoryResDto { Id = category.Id, Name = category.Name };
        }

        public async Task<bool> DeleteCategory(int categoryId)
        {
            var category = await _context.ProductCategories.SingleOrDefaultAsync(
                x => x.Id == categoryId
            );

            if (category == null)
                throw new NotFoundException("Category not found.");

            _context.ProductCategories.Remove(category);
            var result = await _context.SaveChangesAsync();

            return result > 0;
        }

        public async Task<List<ProductCategoryResDto>> GetCategories()
        {
            var categoryList = await _context.ProductCategories.ToListAsync();

            var categoryListResDto = categoryList.ConvertAll(
                x => new ProductCategoryResDto { Id = x.Id, Name = x.Name }
            );

            return categoryListResDto;
        }

        public async Task<ProductCategoryResDto> GetCategory(int categoryId)
        {
            var category = await _context.ProductCategories
                .Where(x => x.Id == categoryId)
                .FirstOrDefaultAsync();

            if (category == null)
                throw new NotFoundException("Category not found.");

            var categoryResDto = new ProductCategoryResDto()
            {
                Id = category.Id,
                Name = category.Name
            };

            return categoryResDto;
        }
    }
}
