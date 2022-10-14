using API.DTOs.Request;
using API.DTOs.Response;
using API.Entities;
using AutoMapper;

namespace API.MapperProfiles
{
    public class MapperProfile : Profile
    {
        public MapperProfile()
        {
            MapUserRole();
            MapUser();
            MapSupplier();
            MapProductCategory();
            MapProcurement();
            MapProcurementProduct();
            MapQuotation();
            MapPurchaseOrder();
            MapProduct();
        }

        private void MapUserRole()
        {
            CreateMap<UserRole, UserRoleResDto>();
        }

        private void MapUser()
        {
            CreateMap<User, UserDetailsResDto>()
                .ForMember(dest => dest.Role, opt => opt.MapFrom(src => src.Role.RoleName));
        }

        private void MapSupplier()
        {
            CreateMap<Supplier, SupplierDetailsResDto>()
                .ForMember(dest => dest.Category, opt => opt.MapFrom(src => src.Category.Name));
        }

        private void MapProductCategory()
        {
            CreateMap<ProductCategory, ProductCategoryResDto>();
        }

        private void MapProcurement()
        {
            CreateMap<Procurement, ProcurementResDto>()
                .ForMember(dest => dest.Category, opt => opt.MapFrom(src => src.Category.Name))
                .ForMember(dest => dest.Products, opt => opt.MapFrom(src => src.Products))
                .ForMember(dest => dest.Quotations, opt => opt.MapFrom(src => src.Quotations));
        }

        private void MapProcurementProduct()
        {
            CreateMap<ProcurementProduct, ProcurementProductResDto>()
                .ForMember(dest => dest.Category, opt => opt.MapFrom(src => src.Category.Name));

            CreateMap<ProcurementProductReqDto, ProcurementProduct>();
        }

        private void MapQuotation()
        {
            CreateMap<Quotation, QuotationResDto>()
                .ForMember(
                    dest => dest.ProcurementId,
                    opt => opt.MapFrom(src => src.Procurement.Id)
                )
                .ForMember(
                    dest => dest.ProcurementName,
                    opt => opt.MapFrom(src => src.Procurement.Title)
                );
        }

        private void MapPurchaseOrder()
        {
            CreateMap<PurchaseOrder, PurchaseOrderResDto>()
                .ForMember(dest => dest.Category, opt => opt.MapFrom(src => src.Category.Name));
        }

        private void MapProduct()
        {
            CreateMap<Product, ProductResDto>()
                .ForMember(dest => dest.Category, opt => opt.MapFrom(src => src.Category.Name));
        }
    }
}
