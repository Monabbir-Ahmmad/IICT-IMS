﻿using API.DTOs.Response;

namespace API.Interfaces.Category
{
    public interface ICategoryService
    {
        Task<bool> CreateCategory(string categoryName);
        Task<bool> DeleteCategory(int categoryId);
        Task<List<CategoryResponseDto>> GetCategories();
        Task<CategoryResponseDto> GetCategory(int categoryId);


    }
}
