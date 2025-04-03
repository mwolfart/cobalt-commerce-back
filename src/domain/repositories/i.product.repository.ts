import { Product } from "../entities/product/product.entity";

export interface IProductRepository {
  getAllProducts(): Promise<Product[]>;
  createProduct(
    name: string,
    price: number,
    qty: number,
    description?: string,
    image?: string,
    categoryIds?: string[],
  ): Promise<Product>;
  getProductById(uuid: string): Promise<Product | null>;
  updateProduct(
    uuid: string,
    name?: string,
    price?: number,
    qty?: number,
    description?: string,
    image?: string,
    categoryIds?: string[],
  ): Promise<Product>;
}
