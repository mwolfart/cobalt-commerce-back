import { Router } from "express";
import getDB from "../database/db";
import { CategoryController } from "../controller/category.controller";
import { CategoryService } from "../../application/services/category.service";
import { AuthService } from "src/application/services/auth.service";

export const createCategoryRoutes = async () => {
  const router = Router();
  const { categoryRepository, userRepository } = await getDB();

  const authService = new AuthService(userRepository);
  const categoryService = new CategoryService(categoryRepository);
  const categoryController = new CategoryController(
    categoryService,
    authService,
  );

  router.get("/", categoryController.getAllCategories.bind(categoryController));
  router.post("/", categoryController.postCategory.bind(categoryController));

  return router;
};
