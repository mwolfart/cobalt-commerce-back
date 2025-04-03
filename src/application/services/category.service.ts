import Joi from "joi";
import { ICategoryRepository } from "../../domain/repositories/i.category.repository";
import { CreateCategoryDto } from "../dtos/create-category.dto";
import { ValidationError } from "@mikro-orm/core";

export class CategoryService {
  constructor(private readonly categoryRepository: ICategoryRepository) {}

  private validateCreateCategory(payload: CreateCategoryDto): void {
    const schema = Joi.object({
      name: Joi.string().required(),
    });

    const { error } = schema.validate(payload);
    if (error) {
      throw new ValidationError(error.message);
    }
  }

  async getAllCategories() {
    const categories = await this.categoryRepository.getAllCategories();
    return categories;
  }

  async createCategory(payload: CreateCategoryDto) {
    this.validateCreateCategory(payload);
    const { name } = payload;
    const existing = await this.categoryRepository.getCategoryByName(name);
    if (existing) {
      throw new Error("ALREADY_EXISTS");
    }
    const category = await this.categoryRepository.createCategory(name);
    return category;
  }
}
