import { Request, Response } from "express";

export default {
  getAllCategories: (_req: Request, res: Response) => {
    res.status(200).json({ message: "GET all categories" });
  },

  postCategory: (_req: Request, res: Response) => {
    res.status(201).json({ message: "POST category" });
  },
};
