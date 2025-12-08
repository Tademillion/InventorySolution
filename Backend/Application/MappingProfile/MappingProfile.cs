using AutoMapper;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        
        CreateMap<UserForRegistrationDto, User>();
        //  Product
        CreateMap<Product, ProductDto>()
            .ForMember(dest => dest.CategoryName, 
                       opt => opt.MapFrom(src => src.Category.Name))
            .ForMember(dest => dest.SupplierName, 
                       opt => opt.MapFrom(src => src.Supplier.Name));
                    //     create Product
        CreateMap<CreateProductDto, Product>();
        //     update Product
           CreateMap<UpdateProductDto, Product>()
            .ForAllMembers(opt => opt.Condition((src, dest, value) => value != null));        //   list Product
        CreateMap<Product, ProductListDto>()
            .ForMember(dest => dest.CategoryName, 
                       opt => opt.MapFrom(src => src.Category.Name))
            .ForMember(dest => dest.SupplierName, 
                       opt => opt.MapFrom(src => src.Supplier.Name));
    }
}