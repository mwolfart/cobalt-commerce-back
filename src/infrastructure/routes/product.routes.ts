import express from "express";
import productController from "../controller/product.controller";

const router = express.Router();

router.get("/api/v1/product", productController.getAllProducts);
router.post("/api/v1/product", productController.postProduct);
router.get("/api/v1/product/:id", productController.getProduct);
router.patch("/api/v1/product/:id", productController.patchProduct);

export default router;
