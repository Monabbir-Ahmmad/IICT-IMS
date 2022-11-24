using System.Net.Http.Headers;
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
    public class DirectPurchaseService : IDirectPurchaseService
    {
        private readonly DatabaseContext _context;
        private readonly IMapper _mapper;

        public DirectPurchaseService(DatabaseContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task CreateDirectPurchase(DirectPurchaseCreateReqDto directPurchaseDto)
        {
            var purchaseCategory = await _context.Categories
                .Where(x => x.Id == directPurchaseDto.CategoryId)
                .FirstOrDefaultAsync();

            if (purchaseCategory == null)
                throw new NotFoundException("Purchase category not found.");

            var totalPrice = directPurchaseDto.Products.Sum(x => x.UnitPrice * x.Quantity);

            if (totalPrice > 25000)
                throw new BadRequestException("Total price cannot be greater than 25,000.");

            var directPurchase = new DirectPurchase
            {
                Title = directPurchaseDto.Title,
                Category = purchaseCategory,
                TotalPrice = totalPrice,
                PurchaseDate = directPurchaseDto.PurchaseDate,
                SupplierName = directPurchaseDto.SupplierName,
                SupplierAddress = directPurchaseDto.SupplierAddress,
                SupplierContact = directPurchaseDto.SupplierContact,
                Voucher =
                    directPurchaseDto.Voucher != null
                        ? new Voucher { FileName = SaveVoucherImage(directPurchaseDto.Voucher) }
                        : null,
                Products = new List<InventoryProduct>()
            };

            foreach (var product in directPurchaseDto.Products)
            {
                Product productEntity = null;
                if (product.Id > 0)
                    productEntity = await _context.Products
                        .Where(x => x.Id == product.Id)
                        .FirstOrDefaultAsync();

                if (productEntity == null)
                {
                    productEntity = new Product
                    {
                        Name = product.Name,
                        Category = purchaseCategory,
                        Manufacturer = product.Manufacturer,
                        Details = product.Details
                    };
                    _context.Products.Add(productEntity);
                }

                for (int i = 0; i < product.Quantity; i++)
                {
                    directPurchase.Products.Add(
                        new InventoryProduct
                        {
                            Product = productEntity,
                            DirectPurchase = directPurchase,
                            Price = product.UnitPrice,
                            WarrantyExpiryDate = product.WarrantyExpiryDate ?? null,
                            Status = StatusEnum.InInventory
                        }
                    );
                }
            }

            _context.DirectPurchases.Add(directPurchase);

            await _context.SaveChangesAsync();

            return;
        }

        public async Task<PaginatedResDto<DirectPurchaseResDto>> GetDirectPurchases(
            PaginatedFilterSortParam param
        )
        {
            var purchases = _context.DirectPurchases
                .Include(x => x.Category)
                .Include(x => x.Voucher)
                .Include(x => x.Products)
                .ThenInclude(x => x.Product)
                .ThenInclude(x => x.Category)
                .AsQueryable();

            var totalCount = await purchases.CountAsync();

            purchases = purchases
                .ApplyFiltering(param.SearchColumn, param.SearchValue, param.SearchOperator)
                .ApplySorting(param.SortColumn, param.SortDirection)
                .ApplyPagination(param.PageNumber, param.PageSize);

            return new PaginatedResDto<DirectPurchaseResDto>
            {
                Data = _mapper.Map<List<DirectPurchaseResDto>>(await purchases.ToListAsync()),
                TotalCount = totalCount,
                PageNumber = param.PageNumber,
                PageSize = param.PageSize,
            };
        }


        public async Task<DirectPurchaseResDto> GetDirectPurchase(int id)
        {
            var purchase = await _context.DirectPurchases
                .Include(x => x.Category)
                .Include(x => x.Voucher)
                .Include(x => x.Products)
                .ThenInclude(x => x.Product)
                .ThenInclude(x => x.Category)
                .Where(x => x.Id == id)
                .FirstOrDefaultAsync();

            if (purchase == null)
                throw new NotFoundException("Direct purchase not found.");

            return _mapper.Map<DirectPurchaseResDto>(purchase);
        }

        private string SaveVoucherImage(IFormFile file)
        {
            try
            {
                var folderName = Path.Combine("Resources", "Images");
                var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);

                if (!Directory.Exists(pathToSave))
                {
                    Directory.CreateDirectory(pathToSave);
                }

                if (file.Length > 0)
                {
                    //Create filename with unique guid
                    var fileName =
                        Guid.NewGuid()
                        + ContentDispositionHeaderValue
                            .Parse(file.ContentDisposition)
                            .FileName.Trim('"');

                    var fullPath = Path.Combine(pathToSave, fileName);
                    var dbPath = Path.Combine(folderName, fileName);

                    using (var stream = new FileStream(fullPath, FileMode.Create))
                    {
                        file.CopyTo(stream);
                    }

                    return fileName;
                }
                else
                {
                    return null;
                }
            }
            catch (Exception)
            {
                return null;
            }
        }


    }
}
