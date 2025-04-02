import { Router } from "express";
import getDB from "../database/db";
import { CategoryController } from "../controller/category.controller";
import { CategoryService } from "../../application/services/category.service";

export const createCategoryRoutes = async () => {
    const router = Router();
    const { categoryRepository } = await getDB();
    
    const categoryService = new CategoryService(categoryRepository);
    const categoryController = new CategoryController(categoryService);

    router.get("/", categoryController.getAllCategories.bind(categoryController));
    router.post("/", categoryController.postCategory.bind(categoryController));

    return router;
};
