import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { v4 } from "uuid";

@Entity()
export class Category {
  @PrimaryKey({ type: "uuid" })
  uuid = v4();

  @Property()
  name!: string;
}
