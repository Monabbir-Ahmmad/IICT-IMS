﻿using System.ComponentModel.DataAnnotations;
using API.DTOs.Request;
using API.DTOs.Response;
using API.Enums;
using API.Interfaces;
using API.Utilities;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize(UserRoleEnum.Admin, UserRoleEnum.Director)]
    [Route("api/[controller]")]
    [ApiController]
    public class ProductCategoryController : ControllerBase
    {
        private readonly IProductCategoryService _productCategoryService;

        public ProductCategoryController(IProductCategoryService productCategoryService)
        {
            _productCategoryService = productCategoryService;
        }

        [HttpPost("create")]
        public async Task<ActionResult<ProductCategoryResDto>> CreateCategory(
            [Required] string name
        )
        {
            return Created("Category created", await _productCategoryService.CreateCategory(name));
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteCategory(int id)
        {
            await _productCategoryService.DeleteCategory(id);
            return Ok("Category Deleted.");
        }

        [HttpPut]
        public async Task<ActionResult> GetCategory(ProductCategoryUpdateReqDto categoryDto)
        {
            await _productCategoryService.UpdateCategory(categoryDto);
            return Ok("Category updated.");
        }

        [HttpGet]
        public async Task<ActionResult<List<ProductCategoryResDto>>> GetCategories()
        {
            return await _productCategoryService.GetCategories();
        }
    }
}
