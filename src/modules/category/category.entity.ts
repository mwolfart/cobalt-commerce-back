import {
  Collection,
  Entity,
  ManyToMany,
  PrimaryKey,
  Property,
} from "@mikro-orm/core";
import { v4 } from "uuid";
import { BaseEntity } from "../common/base.entity";
import { Product } from "../product/product.entity";

@Entity()
export class Category extends BaseEntity {
  @Property()
  name!: string;

  @ManyToMany({ mappedBy: "categories" })
  products = new Collection<Product>(this);
}
