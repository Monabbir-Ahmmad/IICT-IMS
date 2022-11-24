using System.Net;
using API.Database;
using API.DTOs.Params;
using API.DTOs.Request;
using API.DTOs.Response;
using API.Entities;
using API.Enums;
using API.Errors;
using API.Extensions;
using API.Interfaces;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace API.Services
{
    public class ProcurementService : IProcurementService
    {
        private readonly DatabaseContext _context;
        private readonly IMapper _mapper;

        public ProcurementService(DatabaseContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<ProcurementResDto> CreateProcurement(ProcurementReqDto procurementReqDto)
        {
            var createdBy = await _context.Users
                .Include(x => x.Role)
                .FirstOrDefaultAsync(x => x.Id == procurementReqDto.CreatedById);

            if (createdBy == null)
                throw new NotFoundException("User not found.");

            if (!UserRoleEnum.ProcurementMakerRoles.Contains(createdBy.Role.Name))
                throw new BadRequestException("User is not allowed to create procurement.");

            var procurementCategory = await _context.Categories
                .Where(x => x.Id == procurementReqDto.ProcurementCategoryId)
                .FirstOrDefaultAsync();

            if (procurementCategory == null)
                throw new NotFoundException("Procurement category not found.");

            var estimatedTotalPrice = procurementReqDto.Products.Sum(
                x => x.EstimatedPrice * x.Quantity
            );

            if (estimatedTotalPrice > 300000)
                throw new BadRequestException(
                    "Estimated subtotal price cannot be greater than 300,000."
                );

            var procurement = new Procurement
            {
                CreatedBy = createdBy,
                Title = procurementReqDto.Title,
                Category = procurementCategory,
                EstimatedTotalPrice = estimatedTotalPrice,
                Deadline = procurementReqDto.Deadline,
                Status = StatusEnum.PendingApproval,
                Products = new List<ProcurementProduct>()
            };

            foreach (var product in procurementReqDto.Products)
            {
                Product productEntity = null;
                if (product.Id > 0)
                    productEntity = await _context.Products
                        .Where(x => x.Id == product.Id)
                        .FirstOrDefaultAsync();

                if (productEntity == null)
                    procurement.Products.Add(
                        new ProcurementProduct
                        {
                            Product = new Product
                            {
                                Name = product.Name,
                                Category = procurementCategory,
                                Manufacturer = product.Manufacturer,
                                Details = product.Details
                            },
                            EstimatedPrice = product.EstimatedPrice,
                            Quantity = product.Quantity
                        }
                    );
                else
                    procurement.Products.Add(
                        new ProcurementProduct
                        {
                            Product = productEntity,
                            EstimatedPrice = product.EstimatedPrice,
                            Quantity = product.Quantity
                        }
                    );
            }

            _context.Procurements.Add(procurement);

            await _context.SaveChangesAsync();

            return _mapper.Map<ProcurementResDto>(procurement);
        }

        public async Task<bool> DeleteProcurement(int id)
        {
            var procurement = await _context.Procurements.SingleOrDefaultAsync(x => x.Id == id);

            if (procurement == null)
                throw new NotFoundException("Procurement not found.");
            if (procurement.Status == StatusEnum.OfferAccepted)
                throw new ApiException(
                    HttpStatusCode.Forbidden,
                    "Can't delete procurement after accepting an offer."
                );

            _context.Procurements.Remove(procurement);

            var result = await _context.SaveChangesAsync();

            return result > 0;
        }

        public async Task<ProcurementResDto> GetProcurement(int id)
        {
            var procurement = await _context.Procurements
                .Where(x => x.Id == id)
                .Include(x => x.Category)
                .Include(x => x.Products)
                .ThenInclude(x => x.Product)
                .ThenInclude(x => x.Category)
                .Include(x => x.Quotations)
                .ThenInclude(x => x.Supplier)
                .ThenInclude(s => s.Category)
                .Include(x => x.CreatedBy)
                .ThenInclude(x => x.Role)
                .FirstOrDefaultAsync();

            if (procurement == null)
                throw new NotFoundException("Procurement not found.");

            return _mapper.Map<ProcurementResDto>(procurement);
        }

        public async Task<PaginatedResDto<ProcurementResDto>> GetProcurements(
            PaginatedFilterSortParam param
        )
        {
            var procurements = _context.Procurements
                .Include(x => x.Category)
                .Include(x => x.Products)
                .ThenInclude(x => x.Product)
                .ThenInclude(x => x.Category)
                .Include(x => x.Quotations)
                .ThenInclude(x => x.Supplier)
                .ThenInclude(s => s.Category)
                .AsQueryable();

            var totalCount = await procurements.CountAsync();

            procurements = procurements
                .ApplyFiltering(param.SearchColumn, param.SearchValue, param.SearchOperator)
                .ApplySorting(param.SortColumn, param.SortDirection)
                .ApplyPagination(param.PageNumber, param.PageSize);

            return new PaginatedResDto<ProcurementResDto>
            {
                PageNumber = param.PageNumber,
                PageSize = param.PageSize,
                TotalCount = totalCount,
                Data = _mapper.Map<List<ProcurementResDto>>(await procurements.ToListAsync())
            };
        }
    }
}
