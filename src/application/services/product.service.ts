
import { IProductRepository } from "../../domain/repositories/i.product.repository";
import { Product } from "../../domain/entities/product/product.entity";

export class ProductService {
    constructor(private readonly productRepository: IProductRepository) {}

    async getAllProducts(): Promise<Product[]> {
        return this.productRepository.getAllProducts();
    }

    async createProduct(name: string, price: number, qty: number): Promise<Product> {
        return this.productRepository.createProduct(name, price, qty);
    }

    async getProductById(uuid: string): Promise<Product> {
        const product = await this.productRepository.getProductById(uuid);
        if (!product) {
            throw new Error("NOT_FOUND");
        }
        return product;
    }

    async updateProduct(uuid: string, name: string, price: number, qty: number): Promise<Product> {
        return this.productRepository.updateProduct(uuid, name, price, qty);
    }
} 