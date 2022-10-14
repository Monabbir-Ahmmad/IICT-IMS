using API.Database;
using API.DTOs.Response;
using API.Enums;
using API.Interfaces.AutoComplete;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace API.Services.AutoComplete
{
    public class AutoCompleteService : IAutoCompleteService
    {
        private readonly DatabaseContext _context;
        private readonly IMapper _mapper;

        public AutoCompleteService(DatabaseContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<List<ProductCategoryResDto>> GetProductCategories()
        {
            var categoryList = await _context.ProductCategories.ToListAsync();

            var categoryListResDto = _mapper.Map<List<ProductCategoryResDto>>(categoryList);

            return categoryListResDto;
        }

        public async Task<List<UserRoleResDto>> GetUserRoles()
        {
            var userRoles = await _context.UserRoles
                .Where(x => x.Name != UserRoleEnum.Supplier)
                .ToListAsync();

            var userRoleListResDto = _mapper.Map<List<UserRoleResDto>>(userRoles);

            return userRoleListResDto;
        }
    }
}
