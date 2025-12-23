export interface ProductDto {
  id: string;
  name: string;
  description: string;
  categoryName:string;
  sku:string
}
export interface CreateProductDto {
  name: string;
  description: string;
  price: number;
}

export interface UpdateProductDto {
  name?: string;
  description?: string;
  price?: number;
}