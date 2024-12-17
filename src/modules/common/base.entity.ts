import { OptionalProps, PrimaryKey, Property } from "@mikro-orm/core";
import { v4 } from "uuid";

export abstract class BaseEntity {
  [OptionalProps]?: "createdAt" | "updatedAt";

  @PrimaryKey({ type: "uuid" })
  uuid = v4();

  @Property()
  createdAt = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date();
}
