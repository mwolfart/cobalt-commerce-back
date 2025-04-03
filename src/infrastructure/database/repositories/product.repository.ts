import { EntityManager } from "@mikro-orm/postgresql";
import { Product } from "../../../domain/entities/product/product.entity";
import { IProductRepository } from "../../../domain/repositories/i.product.repository";
import { Category } from "../../../domain/entities/category/category.entity";

export class ProductRepository implements IProductRepository {
  constructor(private readonly em: EntityManager) {}

  async getAllProducts(): Promise<Product[]> {
    return this.em.findAll(Product);
  }

  async createProduct(
    name: string,
    price: number,
    qty: number,
    description?: string,
    image?: string,
    categoryIds?: string[],
  ): Promise<Product> {
    const product = new Product();
    product.name = name;
    product.price = price;
    product.qty = qty;

    if (description) {
      product.description = description;
    }

    if (image) {
      product.image = image;
    }

    if (categoryIds) {
      const categories = await this.em.find(Category, {
        uuid: { $in: categoryIds },
      });
      product.categories.set(categories);
    }

    await this.em.persistAndFlush(product);
    return product;
  }

  async getProductById(uuid: string): Promise<Product | null> {
    return this.em.findOne(Product, { uuid });
  }

  async updateProduct(
    uuid: string,
    name?: string,
    price?: number,
    qty?: number,
    description?: string,
    image?: string,
    categoryIds?: string[],
  ): Promise<Product> {
    const product = await this.em.findOne(Product, { uuid });
    if (!product) {
      throw new Error("NOT_FOUND");
    }

    if (name) {
      product.name = name;
    }

    if (price) {
      product.price = price;
    }

    if (qty) {
      product.qty = qty;
    }

    if (description) {
      product.description = description;
    }

    if (image) {
      product.image = image;
    }

    if (categoryIds) {
      const categories = await this.em.find(Category, {
        uuid: { $in: categoryIds },
      });
      product.categories.set(categories);
    }

    await this.em.persistAndFlush(product);
    return product;
  }
}
