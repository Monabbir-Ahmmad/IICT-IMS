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
    public class InventoryService : IInventoryService
    {
        private readonly DatabaseContext _context;
        private readonly IMapper _mapper;

        public InventoryService(DatabaseContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<InventoryProductResDto> GetProduct(int id)
        {
            var product = await _context.InventoryProducts
                .Include(p => p.Product)
                .ThenInclude(p => p.Category)
                .Include(p => p.CurrentDistribution)
                .ThenInclude(d => d.Distributor)
                .Include(p => p.CurrentDistribution)
                .ThenInclude(d => d.DistributedTo)
                .Include(p => p.PurchaseOrder)
                .ThenInclude(p => p.Voucher)
                .Include(p => p.PurchaseOrder)
                .ThenInclude(p => p.Supplier)
                .Include(p => p.DirectPurchase)
                .ThenInclude(p => p.Voucher)
                .Include(p => p.DirectPurchase)
                .ThenInclude(p => p.Category)
                .SingleOrDefaultAsync(p => p.Id == id);

            if (product == null)
                throw new NotFoundException("Product not found.");

            return _mapper.Map<InventoryProductResDto>(product);
        }

        public async Task<PaginatedResDto<InventoryProductResDto>> GetProducts(
            PaginatedFilterSortParam param
        )
        {
            var products = _context.InventoryProducts
                .Include(x => x.Product)
                .ThenInclude(x => x.Category)
                .AsQueryable();

            var totalCount = await products.CountAsync();

            products = products
                .ApplyFiltering(param.SearchColumn, param.SearchValue, param.SearchOperator)
                .ApplySorting(param.SortColumn, param.SortDirection)
                .ApplyPagination(param.PageNumber, param.PageSize);

            return new PaginatedResDto<InventoryProductResDto>
            {
                Data = _mapper.Map<List<InventoryProductResDto>>(await products.ToListAsync()),
                TotalCount = totalCount,
                PageNumber = param.PageNumber,
                PageSize = param.PageSize,
            };
        }

        public async Task<InventoryProductResDto> UpdateProductStatus(
            InventoryProductStatusUpdateReqDto product
        )
        {
            var user = await _context.Users
                .Include(u => u.Role)
                .SingleOrDefaultAsync(u => u.Id == product.UserId);
            if (user == null || !UserRoleEnum.InventoryManagementRoles.Contains(user.Role.Name))
                throw new ApiException(
                    HttpStatusCode.Forbidden,
                    "You are not authorized to perform this action."
                );

            var inventoryProduct = await _context.InventoryProducts
                .Include(p => p.Product)
                .ThenInclude(p => p.Category)
                .Include(p => p.CurrentDistribution)
                .ThenInclude(d => d.Distributor)
                .Include(p => p.CurrentDistribution)
                .ThenInclude(d => d.DistributedTo)
                .Include(p => p.PurchaseOrder)
                .ThenInclude(p => p.Voucher)
                .Include(p => p.PurchaseOrder)
                .ThenInclude(p => p.Supplier)
                .SingleOrDefaultAsync(p => p.Id == product.ProductId);

            if (inventoryProduct == null)
                throw new NotFoundException("Product not found.");

            if (inventoryProduct.Status == StatusEnum.Distributed)
                throw new BadRequestException(
                    "Can not change the status of distributed products. Receive the product first."
                );

            if (!StatusEnum.UpdatableStatuse.Contains(inventoryProduct.Status))
                throw new BadRequestException("Invalid status.");

            inventoryProduct.Status = product.Status;

            _context.InventoryProducts.Update(inventoryProduct);
            await _context.SaveChangesAsync();

            return _mapper.Map<InventoryProductResDto>(inventoryProduct);
        }
    }
}
