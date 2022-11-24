using System.Net;
using API.Database;
using API.DTOs.Request;
using API.DTOs.Response;
using API.Entities;
using API.Errors;
using API.Interfaces;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace API.Services
{
    public class ProductCategoryService : IProductCategoryService
    {
        private readonly DatabaseContext _context;

        private readonly IMapper _mapper;

        public ProductCategoryService(DatabaseContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<ProductCategoryResDto> CreateCategory(
            ProductCategoryCreateReqDto categoryDto
        )
        {
            if (await _context.Categories.Where(x => x.Name == categoryDto.Name).AnyAsync())
                throw new ApiException(HttpStatusCode.Conflict, "Category already exists.");

            var category = new Category
            {
                Name = categoryDto.Name,
                Description = categoryDto.Description
            };

            _context.Categories.Add(category);
            await _context.SaveChangesAsync();

            return _mapper.Map<ProductCategoryResDto>(category);
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
            var categories = await _context.Categories.ToListAsync();

            return _mapper.Map<List<ProductCategoryResDto>>(categories);
        }

        public async Task UpdateCategory(ProductCategoryUpdateReqDto categoryDto)
        {
            var category = await _context.Categories.SingleOrDefaultAsync(
                x => x.Id == categoryDto.Id
            );

            if (category == null)
                throw new NotFoundException("Category not found.");

            if (
                await _context.Categories
                    .Where(x => x.Name == categoryDto.Name && x.Id != categoryDto.Id)
                    .AnyAsync()
            )
                throw new ApiException(HttpStatusCode.Conflict, "Category already exists.");

            category.Name = categoryDto.Name;
            category.Description = categoryDto.Description;

            _context.Categories.Update(category);

            await _context.SaveChangesAsync();

            return;
        }
    }
}
