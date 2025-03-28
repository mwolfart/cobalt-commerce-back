import {
  Collection,
  Entity,
  ManyToMany,
  PrimaryKey,
  Property,
} from "@mikro-orm/core";
import { v4 } from "uuid";
import { Category } from "../category/category.entity";
import { BaseEntity } from "../common/base.entity";

@Entity()
export class Product extends BaseEntity {
  @Property()
  name!: string;

  @Property()
  qty!: number;

  @Property()
  price!: number;

  @ManyToMany()
  categories = new Collection<Category>(this);

  @Property()
  image = "";

  @Property({ type: "text" })
  description = "";
}
