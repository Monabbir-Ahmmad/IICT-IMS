using API.Database;
using API.DTOs.Request;
using API.DTOs.Response;
using API.Errors;
using API.Interfaces;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace API.Services
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

        public async Task<SupplierResDto> GetSupplierById(int id)
        {
            var supplier = await _context.Suppliers
                .Include(x => x.Category)
                .FirstOrDefaultAsync(s => s.Id == id);

            if (supplier == null)
                throw new NotFoundException("Supplier not found.");

            return _mapper.Map<SupplierResDto>(supplier);
        }

        public async Task<UserResDto> GetUserById(int id)
        {
            var user = await _context.Users
                .Include(x => x.Role)
                .FirstOrDefaultAsync(x => x.Id == id);

            if (user == null)
                throw new NotFoundException("User not found.");

            return _mapper.Map<UserResDto>(user);
        }

        public async Task UpdateSupplierPassword(PasswordUpdateReqDto passwordUpdateReqDto)
        {
            var supplier = await _context.Suppliers.FirstOrDefaultAsync(
                x => x.Id == passwordUpdateReqDto.Id
            );

            if (supplier == null)
                throw new NotFoundException("Supplier not found.");

            if (!BCrypt.Net.BCrypt.Verify(passwordUpdateReqDto.CurrentPassword, supplier.Password))
                throw new BadRequestException("Current password is incorrect.");

            supplier.Password = BCrypt.Net.BCrypt.HashPassword(passwordUpdateReqDto.NewPassword);

            _context.Suppliers.Update(supplier);

            await _context.SaveChangesAsync();

            return;
        }

        public async Task<SupplierResDto> UpdateSupplierProfile(
            SupplierProfileUpdateReqDto supplierProfileUpdateReqDto
        )
        {
            var supplier = await _context.Suppliers
                .Include(x => x.Category)
                .FirstOrDefaultAsync(x => x.Id == supplierProfileUpdateReqDto.Id);

            if (supplier == null)
                throw new NotFoundException("Supplier not found.");

            if (supplierProfileUpdateReqDto.Email != null)
            {
                if (
                    await _context.Suppliers.AnyAsync(
                        x => x.Email == supplierProfileUpdateReqDto.Email && x.Id != supplier.Id
                    )
                )
                    throw new BadRequestException("Email already exists.");

                supplier.Email = supplierProfileUpdateReqDto.Email;
            }

            supplier.ContactNumber =
                supplierProfileUpdateReqDto.ContactNumber ?? supplier.ContactNumber;

            supplier.Address = supplierProfileUpdateReqDto.Address ?? supplier.Address;

            supplier.Website = supplierProfileUpdateReqDto.Website ?? supplier.Website;

            _context.Suppliers.Update(supplier);

            await _context.SaveChangesAsync();

            return _mapper.Map<SupplierResDto>(supplier);
        }

        public async Task UpdateUserPassword(PasswordUpdateReqDto passwordUpdateReqDto)
        {
            var user = await _context.Users.FirstOrDefaultAsync(
                x => x.Id == passwordUpdateReqDto.Id
            );

            if (user == null)
                throw new NotFoundException("User not found.");

            if (!BCrypt.Net.BCrypt.Verify(passwordUpdateReqDto.CurrentPassword, user.Password))
                throw new BadRequestException("Current password is incorrect.");

            user.Password = BCrypt.Net.BCrypt.HashPassword(passwordUpdateReqDto.NewPassword);

            _context.Users.Update(user);

            await _context.SaveChangesAsync();

            return;
        }

        public async Task<UserResDto> UpdateUserProfile(
            UserProfileUpdateReqDto userProfileUpdateReqDto
        )
        {
            var user = await _context.Users
                .Include(x => x.Role)
                .FirstOrDefaultAsync(x => x.Id == userProfileUpdateReqDto.Id);

            if (user == null)
                throw new NotFoundException("User not found.");

            if (
                await _context.Users.AnyAsync(
                    x => x.Email == userProfileUpdateReqDto.Email && x.Id != user.Id
                )
            )
                throw new BadRequestException("Email already exists.");

            user.Email = userProfileUpdateReqDto.Email;
            user.ContactNumber = userProfileUpdateReqDto.ContactNumber;
            user.Designation = userProfileUpdateReqDto.Designation;

            _context.Users.Update(user);

            await _context.SaveChangesAsync();

            return _mapper.Map<UserResDto>(user);
        }
    }
}
