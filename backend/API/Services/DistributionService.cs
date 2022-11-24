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
    public class DistributionService : IDistributionService
    {
        private readonly DatabaseContext _context;
        private readonly IMapper _mapper;

        public DistributionService(DatabaseContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task DistributeProducts(DistributionReqDto distributionReqDto)
        {
            var distributor = await _context.Users
                .Include(x => x.Role)
                .FirstOrDefaultAsync(x => x.Id == distributionReqDto.DistributorId);

            if (distributor == null)
                throw new NotFoundException("Distributor not found.");
            if (!UserRoleEnum.InventoryManagementRoles.Contains(distributor.Role.Name))
                throw new ApiException(HttpStatusCode.Forbidden, "You can't distribute products.");

            var distributionTo = await _context.Users
                .Include(x => x.Role)
                .FirstOrDefaultAsync(x => x.Id == distributionReqDto.DistributedToId);

            if (distributionTo == null)
                throw new NotFoundException("User for distribution not found.");
            if (!UserRoleEnum.IICTRoles.Contains(distributionTo.Role.Name))
                throw new ApiException(
                    HttpStatusCode.Forbidden,
                    "This user can't receive products."
                );

            var distribution = new Distribution
            {
                Distributor = distributor,
                DistributedTo = distributionTo,
                DistributionDate = distributionReqDto.DistributionDate,
                DistributionRoom = distributionReqDto.DistributionRoom,
                Products = new List<InventoryProduct>()
            };

            foreach (var product in distributionReqDto.Products)
            {
                var inventoryProduct = await _context.InventoryProducts.FindAsync(product.Id);

                if (inventoryProduct == null)
                    throw new NotFoundException("Product not found.");
                if (inventoryProduct.Status != StatusEnum.InInventory)
                    throw new BadRequestException("Product is not currently distributable.");

                inventoryProduct.Status = StatusEnum.Distributed;
                inventoryProduct.CurrentDistribution = distribution;

                _context.InventoryProducts.Update(inventoryProduct);

                distribution.Products.Add(inventoryProduct);
            }

            await _context.Distributions.AddAsync(distribution);
            await _context.SaveChangesAsync();

            return;
        }

        public async Task<PaginatedResDto<InventoryProductResDto>> GetDistributableProducts(
            PaginatedFilterSortParam param
        )
        {
            var products = _context.InventoryProducts
                .Include(x => x.Product)
                .ThenInclude(x => x.Category)
                .Where(x => x.Status == StatusEnum.InInventory)
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

        public async Task<DistributionResDto> GetDistribution(int id)
        {
            var distribution = await _context.Distributions
                .Include(x => x.Distributor)
                .Include(x => x.DistributedTo)
                .Include(x => x.Products)
                .ThenInclude(x => x.Product)
                .ThenInclude(x => x.Category)
                .FirstOrDefaultAsync(x => x.Id == id);

            if (distribution == null)
                throw new NotFoundException("Distribution details not found.");

            return _mapper.Map<DistributionResDto>(distribution);
        }

        public async Task<PaginatedResDto<DistributionResDto>> GetDistributionHistory(
            PaginatedFilterSortParam param
        )
        {
            var distributions = _context.Distributions
                .Include(d => d.Distributor)
                .Include(d => d.DistributedTo)
                .Include(d => d.Products)
                .ThenInclude(p => p.Product)
                .ThenInclude(p => p.Category)
                .AsQueryable();

            var totalCount = await distributions.CountAsync();

            distributions = distributions
                .ApplyFiltering(param.SearchColumn, param.SearchValue, param.SearchOperator)
                .ApplySorting(param.SortColumn, param.SortDirection)
                .ApplyPagination(param.PageNumber, param.PageSize);

            return new PaginatedResDto<DistributionResDto>
            {
                Data = _mapper.Map<List<DistributionResDto>>(await distributions.ToListAsync()),
                TotalCount = totalCount,
                PageNumber = param.PageNumber,
                PageSize = param.PageSize,
            };
        }
    }
}
