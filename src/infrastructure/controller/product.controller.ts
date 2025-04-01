import { Request, Response } from "express";
import getDB from "../database/db";

export default {
  getAllProducts: async (_req: Request, res: Response) => {
    const {product} = await getDB();
    const products = await product.findAll();
    res.status(200).json({ data: products });
  },

  postProduct: (_req: Request, res: Response) => {
    res.status(201).json({ message: "POST product" });
  },

  getProduct: async (req: Request, res: Response) => {
    const {product} = await getDB();
    const p = await product.findOne(req.params.id);
    res.status(200).json({ data: p });
  },

  patchProduct: (_req: Request, res: Response) => {
    res.status(200).json({ message: "PATCH product" });
  },
};
