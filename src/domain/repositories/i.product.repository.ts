import { Product } from "../entities/product/product.entity";

export interface IProductRepository {
    getAllProducts(): Promise<Product[]>;
    createProduct(name: string, price: number, qty: number): Promise<Product>;
    getProductById(uuid: string): Promise<Product | null>;
    updateProduct(uuid: string, name: string, price: number, qty: number): Promise<Product>;
} 