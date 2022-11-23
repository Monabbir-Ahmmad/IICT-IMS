using System.Net;
using API.Database;
using API.DTOs.Request;
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
            if (await _context.Categories.Where(x => x.Name == categoryName).AnyAsync())
                throw new ApiException(HttpStatusCode.Conflict, "Category already exists.");

            var category = new Category { Name = categoryName };

            _context.Categories.Add(category);
            await _context.SaveChangesAsync();

            return new ProductCategoryResDto { Id = category.Id, Name = category.Name };
        }

        public async Task DeleteCategory(int categoryId)
        {
            var category = await _context.Categories.SingleOrDefaultAsync(x => x.Id == categoryId);

            if (category == null)
                throw new NotFoundException("Category not found.");

            _context.Categories.Remove(category);
            await _context.SaveChangesAsync();

            return;
        }

        public async Task<List<ProductCategoryResDto>> GetCategories()
        {
            var categoryList = await _context.Categories.ToListAsync();

            var categoryListResDto = categoryList.ConvertAll(
                x => new ProductCategoryResDto { Id = x.Id, Name = x.Name }
            );

            return categoryListResDto;
        }

        public async Task UpdateCategory(ProductCategoryUpdateReqDto categoryDto)
        {
            var category = await _context.Categories.SingleOrDefaultAsync(
                x => x.Id == categoryDto.Id
            );

            if (category == null)
                throw new NotFoundException("Category not found.");

            if (await _context.Categories.Where(x => x.Name == categoryDto.Name).AnyAsync())
                throw new ApiException(HttpStatusCode.Conflict, "Category already exists.");

            category.Name = categoryDto.Name;

            _context.Categories.Update(category);

            await _context.SaveChangesAsync();

            return;
        }
    }
}
