import { Request, Response } from "express";
import { ProductService } from "../../application/services/product.service";

export class ProductController {
    constructor(private readonly productService: ProductService) {}

    async getAllProducts(_req: Request, res: Response): Promise<void> {
        const products = await this.productService.getAllProducts();
        res.status(200).json({ data: products });
    }

    async createProduct(req: Request, res: Response): Promise<void> {
        const { name, price, qty } = req.body;
        const product = await this.productService.createProduct(name, price, qty);
        res.status(201).json({ data: product });
    }

    async getProduct(req: Request, res: Response): Promise<void> {
        const product = await this.productService.getProductById(req.params.id);
        res.status(200).json({ data: product });
    }

    async updateProduct(req: Request, res: Response): Promise<void> {
        const { name, price, qty } = req.body;
        const product = await this.productService.updateProduct(req.params.id, name, price, qty);
        res.status(200).json({ data: product });
    }
}
