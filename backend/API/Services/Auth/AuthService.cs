using API.Database;
using API.DTOs.Request;
using API.DTOs.Response;
using API.Entities;
using API.Interfaces.Auth;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Services.Auth
{
    public class AuthService : IAuthService
    {
        private readonly DatabaseContext _context;
        private readonly ITokenService _tokenService;

        public AuthService(DatabaseContext context, ITokenService tokenService)
        {
            _context = context;
            _tokenService = tokenService;
        }

        public async Task<AuthResponseDto> RegisterUser(RegisterDto registerDto)
        {
            var user = new User
            {
                Username = registerDto.Username,
                Email = registerDto.Email,
                Password = BCrypt.Net.BCrypt.HashPassword(registerDto.Password)
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return new AuthResponseDto { User = user, Token = _tokenService.CreateToken(user) };
        }

        public async Task<AuthResponseDto> LoginUser(LoginDto loginDto)
        {
            var user = await _context.Users.SingleOrDefaultAsync(x => x.Email == loginDto.Email);

            if (user == null)
                return null;

            if (!BCrypt.Net.BCrypt.Verify(loginDto.Password, user.Password))
                return null;

            return new AuthResponseDto { User = user, Token = _tokenService.CreateToken(user) };
        }

        public async Task<bool> UserExists(string email)
        {
            return await _context.Users.AnyAsync(x => x.Email == email);
        }

        public Task<bool> PasswordMatche(string username, string password)
        {
            throw new NotImplementedException();
        }
    }
}
