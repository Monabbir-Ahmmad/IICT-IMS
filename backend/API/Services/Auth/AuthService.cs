using API.Database;
using API.DTOs.Request;
using API.DTOs.Response;
using API.Entities;
using API.Interfaces.Auth;
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

        public async Task<AuthResDto> RegisterUser(RegisterReqDto registerDto)
        {
            var user = new User
            {
                Username = registerDto.Username,
                Email = registerDto.Email,
                Password = BCrypt.Net.BCrypt.HashPassword(registerDto.Password)
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return new AuthResDto
            {
                Token = _tokenService.CreateToken(user.Id, user.Email, "User")
            };
        }

        public async Task<AuthResDto> LoginUser(LoginReqDto loginDto)
        {
            var user = await _context.Users.SingleOrDefaultAsync(x => x.Email == loginDto.Email);

            if (user == null)
                return null;

            if (!BCrypt.Net.BCrypt.Verify(loginDto.Password, user.Password))
                return null;

            return new AuthResDto
            {
                Token = _tokenService.CreateToken(user.Id, user.Email, "User")
            };
        }

        public async Task<bool> UserExists(string email)
        {
            return await _context.Users.AnyAsync(x => x.Email == email);
        }

        public Task<bool> PasswordMatch(string username, string password)
        {
            throw new NotImplementedException();
        }

        public async Task<AuthResDto> RegisterSupplier(SupplierRegisterReqDto supplierRegisterDto)
        {
            var supplierCategory = await _context.ProductCategories
                .Where(x => x.Id == supplierRegisterDto.SupplierCategoryId)
                .FirstOrDefaultAsync();

            if (supplierCategory == null)
            {
                return null;
            }

            var supplier = new Supplier
            {
                CompanyName = supplierRegisterDto.CompanyName,
                Email = supplierRegisterDto.Email,
                Password = BCrypt.Net.BCrypt.HashPassword(supplierRegisterDto.Password),
                BIN = supplierRegisterDto.BIN,
                Address = supplierRegisterDto.Address,
                ContactNumber = supplierRegisterDto.ContactNumber,
                Category = supplierCategory
            };

            _context.Suppliers.Add(supplier);
            await _context.SaveChangesAsync();

            return new AuthResDto
            {
                Token = _tokenService.CreateToken(supplier.Id, supplier.Email, "Supplier")
            };
        }

        public async Task<bool> SupplierExists(string BIN, string email, string companyName)
        {
            return await _context.Suppliers.AnyAsync(
                x => x.BIN == BIN && x.Email == email && x.CompanyName == companyName
            );
        }
    }
}
