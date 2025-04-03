import { IProductRepository } from "../../domain/repositories/i.product.repository";
import { Product } from "../../domain/entities/product/product.entity";
import { CreateProductDto } from "../dtos/create-product.dto";
import { UpdateProductDto } from "../dtos/update-product.dto";
import { ValidationError } from "@mikro-orm/core";
import Joi from "joi";

export class ProductService {
  constructor(private readonly productRepository: IProductRepository) {}

  private validateCreateProduct(payload: CreateProductDto): void {
    const schema = Joi.object({
      name: Joi.string().required(),
      price: Joi.number().required(),
      qty: Joi.number().required(),
      description: Joi.string().optional(),
      image: Joi.string().optional(),
      categoryIds: Joi.array().items(Joi.string()).optional(),
    });

    const { error } = schema.validate(payload);
    if (error) {
      throw new ValidationError(error.message);
    }
  }

  private validateUpdateProduct(payload: UpdateProductDto): void {
    const schema = Joi.object({
      name: Joi.string().optional(),
      price: Joi.number().optional(),
      qty: Joi.number().optional(),
      description: Joi.string().optional(),
      image: Joi.string().optional(),
      categoryIds: Joi.array().items(Joi.string()).optional(),
    });

    const { error } = schema.validate(payload);
    if (error) {
      throw new ValidationError(error.message);
    }
  }

  async getAllProducts(): Promise<Product[]> {
    return this.productRepository.getAllProducts();
  }

  async createProduct(payload: CreateProductDto): Promise<Product> {
    this.validateCreateProduct(payload);
    const { name, price, qty, description, image, categoryIds } = payload;
    return this.productRepository.createProduct(
      name,
      price,
      qty,
      description,
      image,
      categoryIds,
    );
  }

  async getProductById(uuid: string): Promise<Product> {
    const product = await this.productRepository.getProductById(uuid);
    if (!product) {
      throw new Error("NOT_FOUND");
    }
    return product;
  }

  async updateProduct(
    uuid: string,
    payload: UpdateProductDto,
  ): Promise<Product> {
    this.validateUpdateProduct(payload);
    const { name, price, qty, description, image, categoryIds } = payload;
    return this.productRepository.updateProduct(
      uuid,
      name,
      price,
      qty,
      description,
      image,
      categoryIds,
    );
  }
}
