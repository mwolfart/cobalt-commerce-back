import { MikroORM } from "@mikro-orm/postgresql";
import config from "./mikro-orm.config";

const initOrm = async () => {
  const orm = await MikroORM.init(config);
  await orm.schema.refreshDatabase();
  return orm;
};

export default initOrm;
