import express from "express";
import categoryController from "../controller/category.controller";

const router = express.Router();

router.get("/api/v1/category", categoryController.getAllCategories);
router.post("/api/v1/category", categoryController.postCategory);

export default router;
