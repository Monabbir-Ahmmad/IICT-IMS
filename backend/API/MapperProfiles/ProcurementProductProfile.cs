using API.DTOs.Request;
using API.DTOs.Response;
using API.Entities;
using AutoMapper;

namespace API.MapperProfiles
{
    public class ProcurementProductProfile : Profile
    {
        public ProcurementProductProfile()
        {
            CreateMap<ProcurementProduct, ProcurementProductResDto>()
                .ForMember(dest => dest.Category, opt => opt.MapFrom(src => src.Category.Name));

            CreateMap<ProcurementProductReqDto, ProcurementProduct>();
        }
    }
}
