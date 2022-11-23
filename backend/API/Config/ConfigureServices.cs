using API.Interfaces;
using API.Services;

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
            services.AddScoped<IDistributionService, DistributionService>();
            services.AddScoped<IReceiveReturnService, ReceiveReturnService>();

            return services;
        }
    }
}
