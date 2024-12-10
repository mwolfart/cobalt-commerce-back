import { Request, Response } from "express";

export default {
  getAllProducts: (_req: Request, res: Response) => {
    res.status(200).json({ message: "GET all products" });
  },

  postProduct: (_req: Request, res: Response) => {
    res.status(201).json({ message: "POST product" });
  },

  getProduct: (_req: Request, res: Response) => {
    res.status(200).json({ message: "GET product" });
  },

  patchProduct: (_req: Request, res: Response) => {
    res.status(200).json({ message: "PATCH product" });
  },
};
