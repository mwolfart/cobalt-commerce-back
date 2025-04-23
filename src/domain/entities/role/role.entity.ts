import { Entity, Property } from "@mikro-orm/core";
import { BaseEntity } from "../common/base.entity";

@Entity()
export class Role extends BaseEntity {
  @Property({ unique: true })
  name!: string;
}
