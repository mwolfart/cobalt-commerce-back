import {
  Collection,
  Entity,
  ManyToMany,
  PrimaryKey,
  Property,
} from "@mikro-orm/core";
import { v4 } from "uuid";
import { Category } from "../category/category.entity";

@Entity()
export class Product {
  @PrimaryKey({ type: "uuid" })
  uuid = v4();

  @Property()
  name!: string;

  @Property()
  qty!: number;

  @Property()
  price!: number;

  @ManyToMany({ entity: () => Category, owner: true })
  categories = new Collection<Category>(this);

  @Property()
  image = "";

  @Property({ type: "text" })
  description = "";
}
