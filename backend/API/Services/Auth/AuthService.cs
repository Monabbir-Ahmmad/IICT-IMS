using System.Net;
using API.Database;
using API.DTOs.Request;
using API.DTOs.Response;
using API.Entities;
using API.Enums;
using API.Errors;
using API.Interfaces.Auth;
using API.Interfaces.Mail;
using API.Interfaces.Token;
using Microsoft.EntityFrameworkCore;

namespace API.Services.Auth
{
    public class AuthService : IAuthService
    {
        private readonly DatabaseContext _context;
        private readonly ITokenService _tokenService;
        private readonly IEmailService _emailService;

        public AuthService(
            DatabaseContext context,
            ITokenService tokenService,
            IEmailService emailService
        )
        {
            _context = context;
            _tokenService = tokenService;
            _emailService = emailService;
        }

        public async Task RegisterUser(RegisterReqDto registerDto)
        {
            if (await this.UserExists(registerDto.Email))
                throw new ApiException(HttpStatusCode.Conflict, "User already exists.");

            var userRole = await _context.UserRoles.FirstOrDefaultAsync(
                ur => ur.Id == registerDto.UserRoleId
            );

            if (userRole == null)
                throw new ApiException(HttpStatusCode.NotFound, "User role does not exist.");

            if (!UserRoleEnum.IICTSignupRoles.Contains(userRole.Name))
                throw new ApiException(
                    HttpStatusCode.Forbidden,
                    "User role is not allowed to sign up is iict employee."
                );

            var user = new User
            {
                Username = registerDto.Username,
                Email = registerDto.Email,
                Role = userRole,
                Password = BCrypt.Net.BCrypt.HashPassword(registerDto.Password),
                ContactNumber = registerDto.ContactNumber,
                Designation = registerDto.Designation
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return;
        }

        public async Task RegisterSupplier(SupplierRegisterReqDto supplierRegisterDto)
        {
            if (
                await this.SupplierExists(
                    supplierRegisterDto.BIN,
                    supplierRegisterDto.Email,
                    supplierRegisterDto.CompanyName
                )
            )
                throw new ApiException(HttpStatusCode.Conflict, "Supplier already exists.");

            var supplierCategory = await _context.Categories
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
                Website = supplierRegisterDto.Website,
                Category = supplierCategory
            };

            _context.Suppliers.Add(supplier);
            await _context.SaveChangesAsync();

            return;
        }

        public async Task<AuthResDto> LoginUser(LoginReqDto loginDto)
        {
            var user = await _context.Users
                .Where(x => x.Email == loginDto.Email)
                .Include(x => x.Role)
                .SingleOrDefaultAsync();

            if (user == null)
                throw new UnauthorizedException("Invalid email address.");

            if (!user.IsVerified)
                throw new UnauthorizedException("Account is not verified.");

            if (!BCrypt.Net.BCrypt.Verify(loginDto.Password, user.Password))
                throw new UnauthorizedException("Invalid password.");

            return new AuthResDto
            {
                RefreshToken = _tokenService.CreateRefreshToken(user.Id, user.Role.Name),
                AccessToken = _tokenService.CreateAccessToken(user.Id, user.Role.Name),
            };
        }

        public async Task<AuthResDto> LoginSupplier(LoginReqDto loginDto)
        {
            var supplier = await _context.Suppliers.SingleOrDefaultAsync(
                x => x.Email == loginDto.Email
            );

            if (supplier == null)
                throw new UnauthorizedException("Invalid email address.");

            if (!supplier.IsVerified)
                throw new UnauthorizedException("Account is not verified.");

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
            var userId = _tokenService.ValidateToken(refreshToken, true);

            if (userId == null)
                throw new UnauthorizedException("Invalid refresh token.");

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
                    RefreshToken = _tokenService.CreateRefreshToken(user.Id, user.Role.Name),
                    AccessToken = _tokenService.CreateAccessToken(user.Id, user.Role.Name),
                };
            }
        }

        public async Task ForgotPassword(ForgotPasswordReqDto forgotPasswordReqDto)
        {
            int userId;
            string role;

            if (forgotPasswordReqDto.IsSupplier)
            {
                var supplier = await _context.Suppliers.SingleOrDefaultAsync(
                    x => x.Email == forgotPasswordReqDto.Email
                );

                if (supplier == null)
                    throw new UnauthorizedException("Invalid email address.");

                userId = supplier.Id;
                role = UserRoleEnum.Supplier;
            }
            else
            {
                var user = await _context.Users
                    .Where(x => x.Email == forgotPasswordReqDto.Email)
                    .Include(x => x.Role)
                    .SingleOrDefaultAsync();

                if (user == null)
                    throw new UnauthorizedException("Invalid email address.");

                userId = user.Id;
                role = user.Role.Name;
            }

            var token = _tokenService.CreateAccessToken(userId, role);

            var messageBody =
                $@"
                    <h1>Reset Password</h1>
                    <p>Click the link below to reset your password.</p>
                    <a href=""{"http://localhost:5000/api/Auth/reset-password/"}{token}"">Reset Password Link</a>
                ";

            await _emailService.SendEmail(
                forgotPasswordReqDto.Email,
                "Reset Password",
                messageBody
            );

            return;
        }

        public async Task<string> ResetPassword(string token)
        {
            var userId = _tokenService.ValidateToken(token);

            if (userId == null)
                throw new UnauthorizedException("Invalid token.");

            var role = _tokenService.GetRoleFromToken(token);

            var password = GeneratePassword(8);

            var hashedPassword = BCrypt.Net.BCrypt.HashPassword(password);

            if (role == UserRoleEnum.Supplier)
            {
                var supplier = await _context.Suppliers.FindAsync(userId);

                if (supplier == null)
                    throw new UnauthorizedException("Invalid token.");

                supplier.Password = hashedPassword;

                _context.Suppliers.Update(supplier);

                await _context.SaveChangesAsync();
            }
            else
            {
                var user = _context.Users.Find(userId);

                if (user == null)
                    throw new UnauthorizedException("Invalid token.");

                user.Password = hashedPassword;

                _context.Users.Update(user);

                await _context.SaveChangesAsync();
            }
            return password;
        }

        private static string GeneratePassword(int length)
        {
            // special characters
            const string specialChars = "!@#$%^&*()_+<>?";
            // string of all characters
            const string chars =
                "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890" + specialChars;

            return new string(
                Enumerable
                    .Repeat(chars, length)
                    .Select(s => s[new Random().Next(s.Length)])
                    .ToArray()
            );
        }
    }
}
