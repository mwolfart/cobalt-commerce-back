import { EntityManager, MikroORM } from "@mikro-orm/postgresql";
import { ProductRepository } from "./repositories/product.repository";
import { CategoryRepository } from "./repositories/category.repository";
import config from "./mikro-orm.config";
import { UserRepository } from "./repositories/user.repository";
import { RoleRepository } from "./repositories/role.repository";
import { populateDB } from "./populate";

export interface Services {
  orm: MikroORM;
  em: EntityManager;
  productRepository: ProductRepository;
  categoryRepository: CategoryRepository;
  userRepository: UserRepository;
  roleRepository: RoleRepository;
}

let cache: Services | null = null;

const getDB = async (initialize: boolean = false) => {
  if (cache) return cache;

  const orm = await MikroORM.init(config);

  if (initialize) {
    await orm.schema.refreshDatabase();
    await populateDB(orm.em.fork());
  }

  const em = orm.em.fork();

  return (cache = {
    orm,
    em,
    productRepository: new ProductRepository(em),
    categoryRepository: new CategoryRepository(em),
    userRepository: new UserRepository(em),
    roleRepository: new RoleRepository(em),
  });
};

export default getDB;
