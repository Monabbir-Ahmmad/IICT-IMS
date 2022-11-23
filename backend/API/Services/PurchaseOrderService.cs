using System.Net;
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

namespace API.Interfaces
{
    public class PurchaseOrderService : IPurchaseOrderService
    {
        private readonly DatabaseContext _context;
        private readonly IMapper _mapper;
        private readonly IProcurementService _procurementService;

        public PurchaseOrderService(
            DatabaseContext context,
            IMapper mapper,
            IProcurementService procurementService
        )
        {
            _context = context;
            _mapper = mapper;
            _procurementService = procurementService;
        }

        public async Task<ProcurementResDto> CreatePurchaseOrder(
            PurchaseOrderCreateReqDto purchaseOrderCreateReqDto
        )
        {
            var createdBy = await _context.Users
                .Include(x => x.Role)
                .FirstOrDefaultAsync(x => x.Id == purchaseOrderCreateReqDto.CreatedById);

            if (createdBy == null)
                throw new NotFoundException("User not found.");

            if (!UserRoleEnum.PurchaseOrderMakerRoles.Contains(createdBy.Role.Name))
                throw new BadRequestException("User is not allowed to create purchase order.");

            if (
                await _context.PurchaseOrders.AnyAsync(
                    x => x.Procurement.Id == purchaseOrderCreateReqDto.ProcurementId
                )
            )
                throw new ApiException(
                    HttpStatusCode.Conflict,
                    "A quotation has already been accepted for this procurement."
                );

            var procurement = await _context.Procurements
                .Include(x => x.Category)
                .Include(x => x.Products)
                .ThenInclude(x => x.Product)
                .SingleOrDefaultAsync(x => x.Id == purchaseOrderCreateReqDto.ProcurementId);

            if (procurement == null)
                throw new NotFoundException("Procurement not found.");

            var quotation = await _context.Quotations
                .Include(x => x.Supplier)
                .SingleOrDefaultAsync(
                    x =>
                        x.Id == purchaseOrderCreateReqDto.QuotationId
                        && x.Procurement.Id == purchaseOrderCreateReqDto.ProcurementId
                );

            if (quotation == null)
                throw new NotFoundException("Quotation not found.");

            var purchaseOrder = new API.Entities.PurchaseOrder
            {
                CreatedBy = createdBy,
                Title = procurement.Title,
                Procurement = procurement,
                Quotation = quotation,
                Supplier = quotation.Supplier,
                Category = procurement.Category,
                Products = new List<PurchaseOrderProduct>(),
                DeliveryDeadline = purchaseOrderCreateReqDto.DeliveryDeadline,
                TotalPrice = quotation.QuotedTotalPrice,
                Status = StatusEnum.PendingApproval,
            };

            foreach (var product in procurement.Products)
            {
                purchaseOrder.Products.Add(
                    new PurchaseOrderProduct
                    {
                        Product = product.Product,
                        PurchaseOrder = purchaseOrder,
                        Quantity = product.Quantity,
                    }
                );
            }

            procurement.Status = StatusEnum.OfferAccepted;

            quotation.Accepted = true;

            _context.Procurements.Update(procurement);

            _context.Quotations.Update(quotation);

            _context.PurchaseOrders.Add(purchaseOrder);

            await _context.SaveChangesAsync();

            return await _procurementService.GetProcurement(
                purchaseOrderCreateReqDto.ProcurementId
            );
        }

        public async Task<PurchaseOrderResDto> GetPurchaseOrder(int id)
        {
            var purchaseOrder = await _context.PurchaseOrders
                .Include(x => x.Category)
                .Include(x => x.Products)
                .ThenInclude(x => x.Product)
                .ThenInclude(x => x.Category)
                .Include(x => x.Supplier)
                .Include(x => x.Procurement)
                .Include(x => x.Quotation)
                .ThenInclude(x => x.Supplier)
                .Include(x => x.CreatedBy)
                .ThenInclude(x => x.Role)
                .Include(x => x.Voucher)
                .SingleOrDefaultAsync(x => x.Id == id);

            if (purchaseOrder == null)
                throw new NotFoundException("Purchase order not found.");

            return _mapper.Map<PurchaseOrderResDto>(purchaseOrder);
        }

        public async Task<PaginatedResDto<PurchaseOrderResDto>> GetPurchaseOrders(
            PaginatedFilterSortParam param
        )
        {
            var purchaseOrders = _context.PurchaseOrders
                .Include(x => x.Supplier)
                .Include(x => x.CreatedBy)
                .ThenInclude(x => x.Role)
                .Include(x => x.Category)
                .Include(x => x.Products)
                .ThenInclude(x => x.Product)
                .ThenInclude(x => x.Category)
                .AsQueryable();

            var totalCount = await purchaseOrders.CountAsync();

            purchaseOrders = purchaseOrders
                .ApplyFiltering(param.SearchColumn, param.SearchValue, param.SearchOperator)
                .ApplySorting(param.SortColumn, param.SortDirection)
                .ApplyPagination(param.PageNumber, param.PageSize);

            return new PaginatedResDto<PurchaseOrderResDto>
            {
                Data = _mapper.Map<List<PurchaseOrderResDto>>(await purchaseOrders.ToListAsync()),
                TotalCount = totalCount,
                PageNumber = param.PageNumber,
                PageSize = param.PageSize,
            };
        }

        public async Task<PaginatedResDto<PurchaseOrderResDto>> GetOrderRequests(
            int supplierId,
            PaginatedFilterSortParam param
        )
        {
            var purchaseOrders = _context.PurchaseOrders
                .Include(x => x.Category)
                .Include(x => x.CreatedBy)
                .ThenInclude(x => x.Role)
                .Include(x => x.Products)
                .ThenInclude(x => x.Product)
                .ThenInclude(x => x.Category)
                .Where(x => x.IsApproved && x.Supplier.Id == supplierId)
                .AsQueryable();

            var totalCount = await purchaseOrders.CountAsync();

            purchaseOrders = purchaseOrders
                .ApplyFiltering(param.SearchColumn, param.SearchValue, param.SearchOperator)
                .ApplySorting(param.SortColumn, param.SortDirection)
                .ApplyPagination(param.PageNumber, param.PageSize);

            return new PaginatedResDto<PurchaseOrderResDto>
            {
                Data = _mapper.Map<List<PurchaseOrderResDto>>(await purchaseOrders.ToListAsync()),
                TotalCount = totalCount,
                PageNumber = param.PageNumber,
                PageSize = param.PageSize,
            };
        }

        public async Task<PurchaseOrderResDto> GetOrderRequest(int id, int supplierId)
        {
            var orderRequest = await _context.PurchaseOrders
                .Include(x => x.Category)
                .Include(x => x.Products)
                .ThenInclude(x => x.Product)
                .ThenInclude(x => x.Category)
                .Include(x => x.Supplier)
                .Include(x => x.CreatedBy)
                .ThenInclude(x => x.Role)
                .SingleOrDefaultAsync(x => x.Id == id && x.Supplier.Id == supplierId);

            if (orderRequest == null)
                throw new NotFoundException("Order request not found.");

            return _mapper.Map<PurchaseOrderResDto>(orderRequest);
        }

        public async Task<PurchaseOrderResDto> ConfrimOrderRequestReceive(
            OrderRequestReceiveConfirmDto orderRequestReceiveConfirmDto
        )
        {
            var purchaseOrder = await _context.PurchaseOrders
                .Include(x => x.Category)
                .Include(x => x.Products)
                .ThenInclude(x => x.Product)
                .ThenInclude(x => x.Category)
                .Include(x => x.Procurement)
                .Include(x => x.Quotation)
                .ThenInclude(x => x.Supplier)
                .SingleOrDefaultAsync(x => x.Id == orderRequestReceiveConfirmDto.PurchaseOrderId);

            if (purchaseOrder == null)
                throw new NotFoundException("Purchase order not found.");

            if (purchaseOrder.Status != StatusEnum.Pending)
                throw new ApiException(
                    HttpStatusCode.Conflict,
                    "Purchase order has already been delivered."
                );

            foreach (var product in orderRequestReceiveConfirmDto.Products)
            {
                var purchaseOrderProduct = purchaseOrder.Products.SingleOrDefault(
                    x => x.Id == product.Id
                );

                if (purchaseOrderProduct == null)
                    throw new NotFoundException("Purchase order product not found.");

                purchaseOrderProduct.UnitPrice = product.UnitPrice;
                if (product.WarrantyExpiryDate != null)
                    purchaseOrderProduct.WarrantyExpiryDate = product.WarrantyExpiryDate;

                _context.PurchaseOrderProducts.Update(purchaseOrderProduct);
            }

            purchaseOrder.Status = StatusEnum.OrderAccepted;
            purchaseOrder.DeliveryDate = orderRequestReceiveConfirmDto.DeliveryDate;

            _context.PurchaseOrders.Update(purchaseOrder);
            await _context.SaveChangesAsync();

            return _mapper.Map<PurchaseOrderResDto>(purchaseOrder);
        }

        public async Task<PurchaseOrderResDto> ConfirmDeliveryReceive(
            DeliveryConfirmReqDto deliveryConfirmReqDto
        )
        {
            var purchaseOrder = await _context.PurchaseOrders
                .Include(x => x.Category)
                .Include(x => x.Products)
                .ThenInclude(x => x.Product)
                .ThenInclude(x => x.Category)
                .Include(x => x.Procurement)
                .Include(x => x.Quotation)
                .ThenInclude(x => x.Supplier)
                .SingleOrDefaultAsync(x => x.Id == deliveryConfirmReqDto.PurchaseOrderId);

            if (purchaseOrder == null)
                throw new NotFoundException("Purchase order not found.");

            if (purchaseOrder.DeliveryDate > DateTime.Now)
                throw new BadRequestException("Delivery has not been sent yet.");

            if (purchaseOrder.Status != StatusEnum.OrderAccepted)
                throw new BadRequestException(
                    "Order has not been accepted or delivery has already been received."
                );

            foreach (var product in purchaseOrder.Products)
            {
                for (var i = 0; i < product.Quantity; i++)
                {
                    var inventory = new InventoryProduct
                    {
                        Product = product.Product,
                        PurchaseOrder = purchaseOrder,
                        Price = product.UnitPrice ?? 0,
                        WarrantyExpiryDate = product.WarrantyExpiryDate ?? null,
                        Status = StatusEnum.InInventory,
                    };

                    _context.InventoryProducts.Add(inventory);
                }
            }

            purchaseOrder.Status = StatusEnum.DeliveryCompleted;
            purchaseOrder.ReceiveDate = DateTime.Now;

            purchaseOrder.Voucher =
                deliveryConfirmReqDto.Voucher != null
                    ? new Voucher { FileName = SaveVoucherImage(deliveryConfirmReqDto.Voucher) }
                    : null;

            _context.PurchaseOrders.Update(purchaseOrder);
            await _context.SaveChangesAsync();

            return _mapper.Map<PurchaseOrderResDto>(purchaseOrder);
        }

        public async Task<bool> DeletePurchaseOrder(int id)
        {
            var purchaseOrder = await _context.PurchaseOrders.SingleOrDefaultAsync(x => x.Id == id);

            if (purchaseOrder == null)
                throw new NotFoundException("Purchase order not found.");

            if (purchaseOrder.Status != StatusEnum.Pending)
                throw new ApiException(
                    HttpStatusCode.Conflict,
                    "Purchase order has already been delivered."
                );

            _context.PurchaseOrders.Remove(purchaseOrder);
            var result = await _context.SaveChangesAsync();

            return result > 0;
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
