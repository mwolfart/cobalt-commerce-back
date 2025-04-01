import { Request, Response } from "express";
import getDB from "../database/db";
import { Category } from "../../domain/modules/category/category.entity";
export default {
  getAllCategories: async (_req: Request, res: Response) => {
    const { category } = await getDB();
    const categories = await category.findAll();
    res.status(200).json({ data: categories });
  },

  postCategory: async (req: Request, res: Response) => {
    const payload = req.body;
    const name = payload.name;

    if (!name) {
      res.status(400).json({ message: "name is required" });
      return;
    }

    const { category, em } = await getDB();

    const existing = await category.findOne({ name });
    if (existing) {
      res.status(400).json({ message: "category already exists" });
      return;
    }

    const newCategory = new Category();
    newCategory.name = name;

    await em.create(Category, newCategory);
    await em.flush();
    res.status(201).json({ data: newCategory });
  },
};
