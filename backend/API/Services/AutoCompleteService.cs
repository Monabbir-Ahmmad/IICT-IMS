using API.Database;
using API.DTOs.Response;
using API.Enums;
using API.Interfaces;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace API.Services
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
            var categoryList = await _context.Categories.ToListAsync();

            return _mapper.Map<List<ProductCategoryResDto>>(categoryList);
        }

        public async Task<List<UserRoleResDto>> GetUserRoles()
        {
            var userRoles = await _context.UserRoles
                .Where(x => UserRoleEnum.IICTSignupRoles.Contains(x.Name))
                .ToListAsync();

            return _mapper.Map<List<UserRoleResDto>>(userRoles);
        }

        public async Task<List<UserResDto>> GetUsers()
        {
            var users = await _context.Users
                .Include(x => x.Role)
                .Where(x => x.IsVerified)
                .ToListAsync();

            return _mapper.Map<List<UserResDto>>(users);
        }
    }
}
