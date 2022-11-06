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

        public async Task<UserResDto> GetUserById(int id)
        {
            var user = await _context.Users
                .Include(x => x.Role)
                .FirstOrDefaultAsync(x => x.Id == id);

            return _mapper.Map<UserResDto>(user);
        }

        public async Task<List<UserResDto>> GetUsers()
        {
            var users = await _context.Users.Include(x => x.Role).ToListAsync();

            return _mapper.Map<List<UserResDto>>(users);
        }
    }
}
