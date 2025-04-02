import { Router } from "express";
import getDB from "../database/db";
import { ProductController } from "../controller/product.controller";
import { ProductService } from "../../application/services/product.service";

export const createProductRoutes = async () => {
    const router = Router();
    const { productRepository } = await getDB();
    
    const productService = new ProductService(productRepository);
    const productController = new ProductController(productService);

    router.get("/", productController.getAllProducts.bind(productController));
    router.post("/", productController.createProduct.bind(productController));
    router.get("/:id", productController.getProduct.bind(productController));
    router.patch("/:id", productController.updateProduct.bind(productController));

    return router;
};
