using API.DTOs.Response;
using API.Entities;
using AutoMapper;

namespace API.MapperProfiles
{
    public class SupplierDetailsProfile : Profile
    {
        public SupplierDetailsProfile()
        {
            CreateMap<Supplier, SupplierDetailsResDto>()
                .ForMember(dest => dest.Category, opt => opt.MapFrom(src => src.Category.Name));
        }
    }
}
