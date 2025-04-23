import { Request, Response } from "express";
import { ProductService } from "../../application/services/product.service";
import { ValidationError } from "@mikro-orm/core";
import { AuthService } from "../../application/services/auth.service";

export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly authService: AuthService,
  ) {}

  async getAllProducts(_req: Request, res: Response): Promise<void> {
    const products = await this.productService.getAllProducts();
    res.status(200).json({ data: products });
  }

  async createProduct(req: Request, res: Response): Promise<void> {
    const authorization = req.headers.authorization;
    const hasValidToken = this.authService.validateToken(
      authorization as string,
    );
    if (!hasValidToken) {
      res.status(401).json({ message: "unauthorized" });
      return;
    }

    const canAccess = this.authService.validateRole(
      authorization as string,
      "admin",
    );
    if (!canAccess) {
      res.status(403).json({ message: "forbidden" });
      return;
    }

    const payload = req.body;
    try {
      const product = await this.productService.createProduct(payload);
      res.status(201).json({ data: product });
    } catch (error) {
      if (error instanceof ValidationError) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: "internal server error" });
      }
    }
  }

  async getProduct(req: Request, res: Response): Promise<void> {
    const product = await this.productService.getProductById(req.params.id);
    res.status(200).json({ data: product });
  }

  async updateProduct(req: Request, res: Response): Promise<void> {
    const authorization = req.headers.authorization;
    const hasValidToken = this.authService.validateToken(
      authorization as string,
    );
    if (!hasValidToken) {
      res.status(401).json({ message: "unauthorized" });
      return;
    }

    const canAccess = this.authService.validateRole(
      authorization as string,
      "admin",
    );
    if (!canAccess) {
      res.status(403).json({ message: "forbidden" });
      return;
    }

    const payload = req.body;

    try {
      const product = await this.productService.updateProduct(
        req.params.id,
        payload,
      );
      res.status(200).json({ data: product });
    } catch (error) {
      if (error instanceof ValidationError) {
        res.status(400).json({ message: error.message });
      } else if (error instanceof Error && error.message === "NOT_FOUND") {
        res.status(404).json({ message: "product not found" });
      } else {
        res.status(500).json({ message: "internal server error" });
      }
    }
  }
}
