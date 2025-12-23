using AutoMapper;
using InventorySystemSolution.Migrations;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        
        CreateMap<UserForRegistrationDto, User>();
        //  ProductInventory
        CreateMap<ProductInventory, ProductInventoryDto>() 
            .ForMember(dest => dest.SupplierName, 
                       opt => opt.MapFrom(src => src.Supplier.Name));
                    //     create Product
        CreateMap<CreateProductInventoryDto, ProductInventory>();
        //     update Product
           CreateMap<UpdateProductInventoryDto, ProductInventory>()
            .ForAllMembers(opt => opt.Condition((src, dest, value) => value != null));        //   list Product
        CreateMap<ProductInventory, ProductInventoryListDto>()
             
            .ForMember(dest => dest.SupplierName, 
                       opt => opt.MapFrom(src => src.Supplier.Name));
                    //     products
        CreateMap<CreateProductDto, Product>();
        CreateMap<UpdateProductDto, Product>();
        CreateMap<Product, ProductResponseDto>()
        .ForMember(dest=>dest.CategoryName,
        opt=>opt.MapFrom(src=>src.Category.Name));
                    //    Supplier
        CreateMap<SupplierUpdateDto, Supplier>();
        CreateMap<Supplier, SupplierDto>();
        CreateMap<SupplierCreateDto, Supplier>();
         //  Category
        CreateMap<CreateCategoryDto, Category>();
        CreateMap<UpdateCategoryDto, Category>();
        CreateMap<Category, CategoryDto>();
        //  invoices
        CreateMap<Invoice, InvoiceDto>();
        CreateMap<CreateInvoiceDto, Invoice>();
        CreateMap<UpdateInvoiceDto, Invoice>();
        //  customer
        CreateMap<Customer, CustomerDto>();
        CreateMap<CreateCustomerDto, Customer>();
        CreateMap<UpdateCustomerDto, Customer>();
        // stock movement
        CreateMap<StockMovement, StockMovementDto>();
        CreateMap<CreateStockMovementDto, StockMovement>();
        CreateMap<UpdateStockMovementDto, StockMovement>();
        // warehouse
        CreateMap<Warehouse, WareHouseDto>();
        CreateMap<WareHouseCreationDto, Warehouse>();
//  
     }

}