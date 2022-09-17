using API.DTOs.Request;
using API.DTOs.Response;
using API.Entities;
using AutoMapper;

namespace API.MapperProfiles
{
    public class ProcurementProfile : Profile
    {
        public ProcurementProfile()
        {
            CreateMap<Procurement, ProcurementResDto>()
                .ForMember(dest => dest.Category, opt => opt.MapFrom(src => src.Category.Name))
                .ForMember(dest => dest.Products, opt => opt.MapFrom(src => src.Products))
                .ForMember(dest => dest.Quotations, opt => opt.MapFrom(src => src.Quotations));
        }
    }
}
