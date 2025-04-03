import { Request, Response } from "express";
import { CategoryService } from "../../application/services/category.service";
import { ValidationError } from "@mikro-orm/core";

export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  async getAllCategories(_req: Request, res: Response) {
    const categories = await this.categoryService.getAllCategories();
    res.status(200).json({ data: categories });
  }

  async postCategory(req: Request, res: Response) {
    const payload = req.body;

    try {
      const newCategory = await this.categoryService.createCategory(payload);
      res.status(201).json({ data: newCategory });
    } catch (error) {
      if (error instanceof ValidationError) {
        res.status(400).json({ message: error.message });
      } else if (
        error instanceof Error &&
        error.message === "CATEGORY_ALREADY_EXISTS"
      ) {
        res.status(409).json({ message: "category already exists" });
      } else {
        res.status(500).json({ message: "internal server error" });
      }
    }
  }
}
