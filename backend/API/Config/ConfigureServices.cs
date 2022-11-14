using API.Interfaces.Admin;
using API.Interfaces.Auth;
using API.Interfaces.AutoComplete;
using API.Interfaces.Inventory;
using API.Interfaces.Mail;
using API.Interfaces.Procurement;
using API.Interfaces.ProductCategory;
using API.Interfaces.PurchaseOrder;
using API.Interfaces.PurchaseOrders;
using API.Interfaces.Quotation;
using API.Interfaces.Token;
using API.Interfaces.User;
using API.Services.Admin;
using API.Services.Auth;
using API.Services.AutoComplete;
using API.Services.Inventory;
using API.Services.Mail;
using API.Services.Procurements;
using API.Services.ProductCategories;
using API.Services.Quotations;
using API.Services.Token;
using API.Services.Users;

namespace API.Config
{
    public static class ConfigureServices
    {
        public static IServiceCollection AddScopedServices(this IServiceCollection services)
        {
            services.AddScoped<ITokenService, TokenService>();
            services.AddScoped<IAuthService, AuthService>();
            services.AddScoped<IAdminService, AdminService>();
            services.AddScoped<IEmailService, EmailService>();
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IAutoCompleteService, AutoCompleteService>();
            services.AddScoped<IProcurementService, ProcurementService>();
            services.AddScoped<IProductCategoryService, ProductCategoryService>();
            services.AddScoped<IQuotationService, QuotationService>();
            services.AddScoped<IPurchaseOrderService, PurchaseOrderService>();
            services.AddScoped<IInventoryService, InventoryService>();

            return services;
        }
    }
}
