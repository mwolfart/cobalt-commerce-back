import { Category } from "../entities/category/category.entity";

export interface ICategoryRepository {
    getAllCategories(): Promise<Category[]>;
    createCategory(name: string): Promise<Category>;
    getCategoryById(uuid: string): Promise<Category | null>;
    getCategoryByName(name: string): Promise<Category | null>;
}

