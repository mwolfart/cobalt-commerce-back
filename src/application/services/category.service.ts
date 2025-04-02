import { ICategoryRepository } from "../../domain/repositories/i.category.repository";

export class CategoryService {
    constructor(private readonly categoryRepository: ICategoryRepository) {}
    async getAllCategories() {
        const categories = await this.categoryRepository.getAllCategories();
        return categories;
    }

    async createCategory(name: string) {
        const existing = await this.categoryRepository.getCategoryByName(name);
        if (existing) {
            throw new Error("ALREADY_EXISTS");
        }
        const category = await this.categoryRepository.createCategory(name);
        return category;
    }
};
