using API.Database;
using API.DTOs.Response;
using API.Interfaces.User;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace API.Services.Users
{
    public class UserService : IUserService
    {
        private readonly DatabaseContext _context;
        private readonly IMapper _mapper;

        public UserService(DatabaseContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<UserDetailsResDto> GetUserById(int id)
        {
            var user = await _context.Users
                .Include(x => x.Role)
                .FirstOrDefaultAsync(x => x.Id == id);

            return _mapper.Map<UserDetailsResDto>(user);
        }

        public async Task<List<UserDetailsResDto>> GetUsers()
        {
            var users = await _context.Users.Include(x => x.Role).ToListAsync();

            return _mapper.Map<List<UserDetailsResDto>>(users);
        }
    }
}
