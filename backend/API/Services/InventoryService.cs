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

        public async Task<InventoryProductResDto> GetProduct(int id)
        {
            var product = await _context.InventoryProducts
                .Include(p => p.Product)
                .ThenInclude(p => p.Category)
                .Include(p => p.CurrentDistribution)
                .ThenInclude(d => d.Distributor)
                .Include(p => p.CurrentDistribution)
                .ThenInclude(d => d.DistributedTo)
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

        public async Task<PaginatedResDto<InventoryProductResDto>> GetReceivableProducts(
            PaginatedFilterSortParam param
        )
        {
            var products = _context.InventoryProducts
                .Include(x => x.Product)
                .ThenInclude(x => x.Category)
                .Where(x => x.Status == StatusEnum.Distributed)
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

        public async Task<PaginatedResDto<ReceiveReturnResDto>> GetReceiveHistory(
            PaginatedFilterSortParam param
        )
        {
            var receiveReturns = _context.ReceiveReturns
                .Include(x => x.Receiver)
                .Include(x => x.ReceivedFrom)
                .Include(x => x.Products)
                .ThenInclude(x => x.Product)
                .ThenInclude(x => x.Category)
                .AsQueryable();

            var totalCount = await receiveReturns.CountAsync();

            receiveReturns = receiveReturns
                .ApplyFiltering(param.SearchColumn, param.SearchValue, param.SearchOperator)
                .ApplySorting(param.SortColumn, param.SortDirection)
                .ApplyPagination(param.PageNumber, param.PageSize);

            return new PaginatedResDto<ReceiveReturnResDto>
            {
                Data = _mapper.Map<List<ReceiveReturnResDto>>(await receiveReturns.ToListAsync()),
                TotalCount = totalCount,
                PageNumber = param.PageNumber,
                PageSize = param.PageSize,
            };
        }

        public async Task ReceiveProducts(ReceiveReturnReqDto receiveReturnReqDto)
        {
            var receiver = await _context.Users
                .Include(x => x.Role)
                .FirstOrDefaultAsync(x => x.Id == receiveReturnReqDto.ReceiverId);

            if (receiver == null)
                throw new NotFoundException("Receiver not found.");
            if (!UserRoleEnum.InventoryManagementRoles.Contains(receiver.Role.Name))
                throw new ApiException(
                    HttpStatusCode.Forbidden,
                    "You can't receive returned products."
                );

            var receiveFrom = await _context.Users
                .Include(x => x.Role)
                .FirstOrDefaultAsync(x => x.Id == receiveReturnReqDto.ReceivedFromId);

            if (receiveFrom == null)
                throw new NotFoundException("Product returner not found.");
            if (!UserRoleEnum.IICTRoles.Contains(receiveFrom.Role.Name))
                throw new ApiException(
                    HttpStatusCode.Forbidden,
                    "This user can't return products."
                );

            var receiveReturn = new ReceiveReturn()
            {
                Receiver = receiver,
                ReceivedFrom = receiveFrom,
                ReceivingDate = receiveReturnReqDto.ReceivingDate,
                Products = new List<InventoryProduct>()
            };

            foreach (var product in receiveReturnReqDto.Products)
            {
                var inventoryProduct = await _context.InventoryProducts
                    .Include(x => x.CurrentDistribution)
                    .FirstOrDefaultAsync(x => x.Id == product.Id);

                if (inventoryProduct == null)
                    throw new NotFoundException("Product not found.");

                if (inventoryProduct.CurrentDistribution == null)
                    throw new BadRequestException("Product is not distributed.");

                inventoryProduct.Status = StatusEnum.InInventory;
                inventoryProduct.CurrentDistribution = null;

                _context.InventoryProducts.Update(inventoryProduct);

                receiveReturn.Products.Add(inventoryProduct);
            }

            await _context.ReceiveReturns.AddAsync(receiveReturn);
            await _context.SaveChangesAsync();

            return;
        }
    }
}
