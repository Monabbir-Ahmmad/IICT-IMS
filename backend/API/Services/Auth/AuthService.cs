using System.Net;
using API.Database;
using API.DTOs.Request;
using API.DTOs.Response;
using API.Entities;
using API.Enums;
using API.Errors;
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
            if (await this.UserExists(registerDto.Email))
                throw new ApiException(HttpStatusCode.Conflict, "User already exists.");

            var userRole = await _context.UserRoles.FirstOrDefaultAsync(
                ur => ur.Id == registerDto.UserRoleId
            );

            if (userRole == null)
                throw new ApiException(HttpStatusCode.NotFound, "User role does not exist.");

            var user = new User
            {
                Username = registerDto.Username,
                Email = registerDto.Email,
                Role = userRole,
                Password = BCrypt.Net.BCrypt.HashPassword(registerDto.Password)
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return new AuthResDto
            {
                RefreshToken = _tokenService.CreateRefreshToken(user.Id, user.Role.RoleName),
                AccessToken = _tokenService.CreateAccessToken(user.Id, user.Role.RoleName),
            };
        }

        public async Task<AuthResDto> RegisterSupplier(SupplierRegisterReqDto supplierRegisterDto)
        {
            if (
                await this.SupplierExists(
                    supplierRegisterDto.BIN,
                    supplierRegisterDto.Email,
                    supplierRegisterDto.CompanyName
                )
            )
                throw new ApiException(HttpStatusCode.Conflict, "Supplier already exists.");

            var supplierCategory = await _context.ProductCategories
                .Where(x => x.Id == supplierRegisterDto.SupplierCategoryId)
                .FirstOrDefaultAsync();

            if (supplierCategory == null)
                throw new ApiException(HttpStatusCode.NotFound, "Supplier category not found");

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
                RefreshToken = _tokenService.CreateRefreshToken(supplier.Id, UserRoleEnum.Supplier),
                AccessToken = _tokenService.CreateAccessToken(supplier.Id, UserRoleEnum.Supplier),
            };
        }

        public async Task<AuthResDto> LoginUser(LoginReqDto loginDto)
        {
            var user = await _context.Users
                .Where(x => x.Email == loginDto.Email)
                .Include(x => x.Role)
                .SingleOrDefaultAsync();

            if (user == null)
                throw new UnauthorizedException("Invalid email address.");

            if (!BCrypt.Net.BCrypt.Verify(loginDto.Password, user.Password))
                throw new UnauthorizedException("Invalid password.");

            return new AuthResDto
            {
                RefreshToken = _tokenService.CreateRefreshToken(user.Id, user.Role.RoleName),
                AccessToken = _tokenService.CreateAccessToken(user.Id, user.Role.RoleName),
            };
        }

        public async Task<AuthResDto> LoginSupplier(LoginReqDto loginDto)
        {
            var supplier = await _context.Suppliers.SingleOrDefaultAsync(
                x => x.Email == loginDto.Email
            );

            if (supplier == null)
                throw new UnauthorizedException("Invalid email address.");

            if (!BCrypt.Net.BCrypt.Verify(loginDto.Password, supplier.Password))
                throw new UnauthorizedException("Invalid password.");

            return new AuthResDto
            {
                RefreshToken = _tokenService.CreateRefreshToken(supplier.Id, UserRoleEnum.Supplier),
                AccessToken = _tokenService.CreateAccessToken(supplier.Id, UserRoleEnum.Supplier),
            };
        }

        public async Task<bool> UserExists(string email)
        {
            return await _context.Users.AnyAsync(x => x.Email == email);
        }

        public async Task<bool> SupplierExists(string BIN, string email, string companyName)
        {
            return await _context.Suppliers.AnyAsync(
                x => x.BIN == BIN || x.Email == email || x.CompanyName == companyName
            );
        }

        public async Task<AuthResDto> RefreshToken(string refreshToken)
        {
            if (_tokenService.IsRefreshTokenExpired(refreshToken))
                throw new UnauthorizedException("Refresh token is expired.");

            var userId = _tokenService.GetUserIdFromToken(refreshToken);
            var role = _tokenService.GetRoleFromToken(refreshToken);

            if (role == UserRoleEnum.Supplier)
            {
                var supplier = await _context.Suppliers.FindAsync(userId);

                if (supplier == null)
                    throw new UnauthorizedException("Invalid refresh token.");

                return new AuthResDto
                {
                    RefreshToken = _tokenService.CreateRefreshToken(
                        supplier.Id,
                        UserRoleEnum.Supplier
                    ),
                    AccessToken = _tokenService.CreateAccessToken(
                        supplier.Id,
                        UserRoleEnum.Supplier
                    ),
                };
            }
            else
            {
                var user = await _context.Users
                    .Where(x => x.Id == userId)
                    .Include(x => x.Role)
                    .SingleOrDefaultAsync();

                if (user == null)
                    throw new UnauthorizedException("Invalid refresh token.");

                return new AuthResDto
                {
                    RefreshToken = _tokenService.CreateRefreshToken(user.Id, user.Role.RoleName),
                    AccessToken = _tokenService.CreateAccessToken(user.Id, user.Role.RoleName),
                };
            }
        }
    }
}
