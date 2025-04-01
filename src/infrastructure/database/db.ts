import { EntityManager, EntityRepository, MikroORM } from "@mikro-orm/postgresql";
import { Product } from "../../domain/entities/product/product.entity";
import { Category } from "../../domain/entities/category/category.entity";
import config from "./mikro-orm.config";

export interface Services {
  orm: MikroORM;
  em: EntityManager;
  product: EntityRepository<Product>;
  category: EntityRepository<Category>;
}

let cache: Services | null = null;

const getDB = async (initialize: boolean = false) => {
  if (cache) return cache;

  const orm = await MikroORM.init(config);

  if (initialize) {
    await orm.schema.refreshDatabase();
  }

  return cache = {
    orm,
    em: orm.em.fork(),
    product: orm.em.fork().getRepository(Product),
    category: orm.em.fork().getRepository(Category),
  };
};

export default getDB;
