using API.DTOs.Response;
using API.Entities;
using AutoMapper;

namespace API.MapperProfiles
{
    public class QuotationProfile : Profile
    {
        public QuotationProfile()
        {
            CreateMap<Quotation, QuotationResDto>()
                .ForMember(
                    dest => dest.ProcurementId,
                    opt => opt.MapFrom(src => src.Procurement.Id)
                )
                .ForMember(
                    dest => dest.ProcurementName,
                    opt => opt.MapFrom(src => src.Procurement.Title)
                )
                .ForMember(dest => dest.SupplierId, opt => opt.MapFrom(src => src.Supplier.Id))
                .ForMember(
                    dest => dest.SupplierName,
                    opt => opt.MapFrom(src => src.Supplier.CompanyName)
                );
        }
    }
}
