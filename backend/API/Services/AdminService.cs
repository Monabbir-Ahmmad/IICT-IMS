using API.Database;
using API.DTOs.Response;
using API.Enums;
using API.Errors;
using API.Interfaces;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace API.Services
{
    public class AdminService : IAdminService
    {
        private readonly DatabaseContext _context;
        private readonly IMapper _mapper;
        private readonly IEmailService _emailService;

        public AdminService(DatabaseContext context, IMapper mapper, IEmailService emailService)
        {
            _context = context;
            _mapper = mapper;
            _emailService = emailService;
        }

        public async Task ApproveProcurement(int procurementId)
        {
            var procurement = await _context.Procurements
                .Where(x => x.Id == procurementId)
                .FirstOrDefaultAsync();

            if (procurement == null)
                throw new NotFoundException("Procurement not found.");

            procurement.IsApproved = true;
            procurement.Status = StatusEnum.NoOffer;

            _context.Procurements.Update(procurement);

            await _context.SaveChangesAsync();

            return;
        }

        public async Task ApprovePurchaseOrder(int purchaseOrderId)
        {
            var purchaseOrder = await _context.PurchaseOrders
                .Where(x => x.Id == purchaseOrderId)
                .FirstOrDefaultAsync();

            if (purchaseOrder == null)
                throw new NotFoundException("Purchase order not found.");

            purchaseOrder.IsApproved = true;
            purchaseOrder.Status = StatusEnum.Pending;

            _context.PurchaseOrders.Update(purchaseOrder);

            await _context.SaveChangesAsync();

            return;
        }

        public async Task ApproveSupplier(int supplierId)
        {
            var supplier = await _context.Suppliers.FindAsync(supplierId);

            if (supplier == null)
                throw new NotFoundException("Supplier not found.");

            supplier.IsVerified = true;

            _context.Suppliers.Update(supplier);

            await _context.SaveChangesAsync();

            await _emailService.SendEmail(
                supplier.Email,
                "Your IICT IMS account has been approved.",
                "Your account has been approved. You can now login to the system."
            );

            return;
        }

        public async Task ApproveUser(int userId)
        {
            var user = await _context.Users.FindAsync(userId);

            if (user == null)
                throw new NotFoundException("User not found.");

            user.IsVerified = true;

            _context.Users.Update(user);

            await _context.SaveChangesAsync();

            await _emailService.SendEmail(
                user.Email,
                "Your IICT IMS account has been approved.",
                String.Format(
                    "Dear {0},\nYour account has been approved. You can now login to the system.",
                    user.Username
                )
            );

            return;
        }

        public async Task DeleteSupplier(int supplierId)
        {
            var supplier = await _context.Suppliers.FindAsync(supplierId);

            if (supplier == null)
                throw new NotFoundException("Supplier not found.");

            _context.Suppliers.Remove(supplier);

            await _context.SaveChangesAsync();

            return;
        }

        public async Task DeleteUser(int userId)
        {
            var user = await _context.Users.FindAsync(userId);

            if (user == null)
                throw new NotFoundException("User not found.");

            _context.Users.Remove(user);

            await _context.SaveChangesAsync();

            return;
        }

        public async Task DeleteProcurement(int procurementId)
        {
            var procurement = await _context.Procurements.FindAsync(procurementId);

            if (procurement == null)
                throw new NotFoundException("Procurement not found.");

            _context.Procurements.Remove(procurement);

            await _context.SaveChangesAsync();

            return;
        }

        public async Task DeletePurchaseOrder(int purchaseOrderId)
        {
            var purchaseOrder = await _context.PurchaseOrders.FindAsync(purchaseOrderId);

            if (purchaseOrder == null)
                throw new NotFoundException("Purchase order not found.");

            _context.PurchaseOrders.Remove(purchaseOrder);

            await _context.SaveChangesAsync();

            return;
        }

        public async Task<List<ProcurementResDto>> GetPendingProcurements()
        {
            var pendingProcurements = await _context.Procurements
                .Where(x => x.IsApproved == false)
                .Include(x => x.Category)
                .Include(x => x.CreatedBy)
                .ThenInclude(x => x.Role)
                .Include(x => x.Products)
                .ThenInclude(x => x.Product)
                .ThenInclude(x => x.Category)
                .ToListAsync();

            return _mapper.Map<List<ProcurementResDto>>(pendingProcurements);
        }

        public async Task<List<PurchaseOrderResDto>> GetPendingPurchaseOrders()
        {
            var pendingPurchaseOrders = await _context.PurchaseOrders
                .Where(x => x.IsApproved == false)
                .Include(x => x.Category)
                .Include(x => x.CreatedBy)
                .ThenInclude(x => x.Role)
                .Include(x => x.Products)
                .ThenInclude(x => x.Product)
                .ThenInclude(x => x.Category)
                .Include(x => x.Procurement)
                .Include(x => x.Quotation)
                .ThenInclude(x => x.Supplier)
                .ToListAsync();

            return _mapper.Map<List<PurchaseOrderResDto>>(pendingPurchaseOrders);
        }

        public async Task<List<SupplierResDto>> GetPendingSuppliers()
        {
            var suppliers = await _context.Suppliers
                .Where(x => x.IsVerified == false)
                .Include(x => x.Category)
                .ToListAsync();

            return _mapper.Map<List<SupplierResDto>>(suppliers);
        }

        public async Task<List<UserResDto>> GetPendingUsers()
        {
            var pendingUsers = await _context.Users
                .Where(x => x.IsVerified == false)
                .Include(x => x.Role)
                .ToListAsync();

            return _mapper.Map<List<UserResDto>>(pendingUsers);
        }

        public async Task<List<SupplierResDto>> GetVerifiedSuppliers()
        {
            var suppliers = await _context.Suppliers.Where(x => x.IsVerified == true).ToListAsync();

            return _mapper.Map<List<SupplierResDto>>(suppliers);
        }

        public async Task<List<UserResDto>> GetVerifiedUsers()
        {
            var verifiedUsers = await _context.Users
                .Where(x => x.IsVerified == true)
                .Include(x => x.Role)
                .ToListAsync();

            return _mapper.Map<List<UserResDto>>(verifiedUsers);
        }

        async Task<PendingCountsResDto> IAdminService.GetPendingCounts()
        {
            var pendingProcurements = await _context.Procurements
                .Where(x => x.IsApproved == false)
                .CountAsync();

            var pendingPurchaseOrders = await _context.PurchaseOrders
                .Where(x => x.IsApproved == false)
                .CountAsync();

            var pendingSuppliers = await _context.Suppliers
                .Where(x => x.IsVerified == false)
                .CountAsync();

            var pendingUsers = await _context.Users.Where(x => x.IsVerified == false).CountAsync();

            return new PendingCountsResDto
            {
                PendingProcurements = pendingProcurements,
                PendingPurchaseOrders = pendingPurchaseOrders,
                PendingSuppliers = pendingSuppliers,
                PendingUsers = pendingUsers
            };
        }
    }
}
