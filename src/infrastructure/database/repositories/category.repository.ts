import { Category } from "../../../domain/entities/category/category.entity";
import { ICategoryRepository } from "../../../domain/repositories/i.category.repository";
import { EntityManager } from "@mikro-orm/postgresql";

export class CategoryRepository implements ICategoryRepository {
    constructor(private readonly em: EntityManager) {}

    async getAllCategories(): Promise<Category[]> {
        return this.em.findAll(Category);
    }

    async createCategory(name: string): Promise<Category> {
        const category = new Category();
        category.name = name;
        await this.em.persistAndFlush(category);
        return category;
    }

    async getCategoryById(uuid: string): Promise<Category | null> {
        return this.em.findOne(Category, { uuid });
    }

    async getCategoryByName(name: string): Promise<Category | null> {
        return this.em.findOne(Category, { name });
    }
};
