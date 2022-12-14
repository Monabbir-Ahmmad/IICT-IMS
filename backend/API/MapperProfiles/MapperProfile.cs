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
            MapPurchaseOrderProduct();
            MapInventoryProduct();
            MapDistributionHistory();
            MapReceiveHistory();
        }

        private void MapUserRole()
        {
            CreateMap<UserRole, UserRoleResDto>();
        }

        private void MapUser()
        {
            CreateMap<User, UserResDto>()
                .ForMember(dest => dest.Role, opt => opt.MapFrom(src => src.Role.Name));
        }

        private void MapSupplier()
        {
            CreateMap<Supplier, SupplierResDto>()
                .ForMember(dest => dest.Category, opt => opt.MapFrom(src => src.Category.Name));
        }

        private void MapProductCategory()
        {
            CreateMap<Category, ProductCategoryResDto>();
        }

        private void MapProcurement()
        {
            CreateMap<Procurement, ProcurementResDto>()
                .ForMember(dest => dest.Category, opt => opt.MapFrom(src => src.Category.Name));
        }

        private void MapProcurementProduct()
        {
            CreateMap<ProcurementProduct, ProcurementProductResDto>()
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Product.Name))
                .ForMember(
                    dest => dest.Category,
                    opt => opt.MapFrom(src => src.Product.Category.Name)
                )
                .ForMember(
                    dest => dest.Manufacturer,
                    opt => opt.MapFrom(src => src.Product.Manufacturer)
                )
                .ForMember(dest => dest.Details, opt => opt.MapFrom(src => src.Product.Details));
        }

        private void MapQuotation()
        {
            CreateMap<Quotation, QuotationResDto>()
                .ForMember(
                    dest => dest.ProcurementId,
                    opt => opt.MapFrom(src => src.Procurement.Id)
                )
                .ForMember(
                    dest => dest.ProcurementTitle,
                    opt => opt.MapFrom(src => src.Procurement.Title)
                );
        }

        private void MapPurchaseOrder()
        {
            CreateMap<PurchaseOrder, PurchaseOrderResDto>()
                .ForMember(dest => dest.Category, opt => opt.MapFrom(src => src.Category.Name));
        }

        private void MapPurchaseOrderProduct()
        {
            CreateMap<PurchaseOrderProduct, PurchaseOrderProductResDto>()
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Product.Name))
                .ForMember(
                    dest => dest.Category,
                    opt => opt.MapFrom(src => src.Product.Category.Name)
                )
                .ForMember(
                    dest => dest.Manufacturer,
                    opt => opt.MapFrom(src => src.Product.Manufacturer)
                )
                .ForMember(dest => dest.Details, opt => opt.MapFrom(src => src.Product.Details));
        }

        private void MapInventoryProduct()
        {
            CreateMap<InventoryProduct, InventoryProductResDto>()
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Product.Name))
                .ForMember(
                    dest => dest.Category,
                    opt => opt.MapFrom(src => src.Product.Category.Name)
                )
                .ForMember(
                    dest => dest.Manufacturer,
                    opt => opt.MapFrom(src => src.Product.Manufacturer)
                )
                .ForMember(dest => dest.Details, opt => opt.MapFrom(src => src.Product.Details));
        }

        private void MapDistributionHistory()
        {
            CreateMap<Distribution, DistributionResDto>()
                .ForMember(
                    dest => dest.DistributorName,
                    opt => opt.MapFrom(src => src.Distributor.Username)
                )
                .ForMember(
                    dest => dest.DistributedToName,
                    opt => opt.MapFrom(src => src.DistributedTo.Username)
                );
        }

        private void MapReceiveHistory()
        {
            CreateMap<ReceiveReturn, ReceiveReturnResDto>()
                .ForMember(
                    dest => dest.ReceiverName,
                    opt => opt.MapFrom(src => src.Receiver.Username)
                )
                .ForMember(
                    dest => dest.ReceivedFromName,
                    opt => opt.MapFrom(src => src.ReceivedFrom.Username)
                );
        }
    }
}
