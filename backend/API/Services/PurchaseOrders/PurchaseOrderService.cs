using System.Net;
using API.Database;
using API.DTOs.Request;
using API.DTOs.Response;
using API.Entities;
using API.Enums;
using API.Errors;
using API.Interfaces.Procurement;
using API.Interfaces.PurchaseOrder;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace API.Interfaces.PurchaseOrders
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
                .SingleOrDefaultAsync(x => x.Id == id);

            if (purchaseOrder == null)
                throw new NotFoundException("Purchase order not found.");

            return _mapper.Map<PurchaseOrderResDto>(purchaseOrder);
        }

        public async Task<List<PurchaseOrderResDto>> GetPurchaseOrders()
        {
            var purchaseOrders = await _context.PurchaseOrders
                .Include(x => x.Category)
                .Include(x => x.Products)
                .ThenInclude(x => x.Product)
                .ThenInclude(x => x.Category)
                .Include(x => x.Procurement)
                .Include(x => x.Quotation)
                .ThenInclude(x => x.Supplier)
                .ToListAsync();

            return _mapper.Map<List<PurchaseOrderResDto>>(purchaseOrders);
        }

        public async Task<List<PurchaseOrderResDto>> GetOrderRequests(int supplierId)
        {
            var purchaseOrders = await _context.PurchaseOrders
                .Where(x => x.IsApproved && x.Supplier.Id == supplierId)
                .Include(x => x.Category)
                .Include(x => x.Products)
                .ThenInclude(x => x.Product)
                .ThenInclude(x => x.Category)
                .Include(x => x.Procurement)
                .Include(x => x.Quotation)
                .ThenInclude(x => x.Supplier)
                .ToListAsync();

            return _mapper.Map<List<PurchaseOrderResDto>>(purchaseOrders);
        }

        public async Task<PurchaseOrderResDto> DeliverPurchaseOrderProducts(
            PurchaseOrderDeliveryReqDto purchaseOrderDeliveryReqDto
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
                .SingleOrDefaultAsync(x => x.Id == purchaseOrderDeliveryReqDto.PurchaseOrderId);

            if (purchaseOrder == null)
                throw new NotFoundException("Purchase order not found.");

            if (purchaseOrder.Status != StatusEnum.Pending)
                throw new ApiException(
                    HttpStatusCode.Conflict,
                    "Purchase order has already been delivered."
                );

            foreach (var product in purchaseOrderDeliveryReqDto.Products)
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

            purchaseOrder.Status = StatusEnum.DeliverySent;
            purchaseOrder.DeliveryDate = purchaseOrderDeliveryReqDto.DeliveryDate;

            _context.PurchaseOrders.Update(purchaseOrder);
            await _context.SaveChangesAsync();

            return _mapper.Map<PurchaseOrderResDto>(purchaseOrder);
        }

        public async Task<PurchaseOrderResDto> ConfirmDeliveryReceive(int purchaseOrderId)
        {
            var purchaseOrder = await _context.PurchaseOrders
                .Include(x => x.Category)
                .Include(x => x.Products)
                .ThenInclude(x => x.Product)
                .ThenInclude(x => x.Category)
                .Include(x => x.Procurement)
                .Include(x => x.Quotation)
                .ThenInclude(x => x.Supplier)
                .SingleOrDefaultAsync(x => x.Id == purchaseOrderId);

            if (purchaseOrder == null)
                throw new NotFoundException("Purchase order not found.");

            if (purchaseOrder.Status != StatusEnum.DeliverySent)
                throw new ApiException(
                    HttpStatusCode.Conflict,
                    "Delivery has not been sent or has already been received."
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
    }
}
