import { Entity, Property } from "@mikro-orm/core";
import { BaseEntity } from "../common/base.entity";
import { Role } from "../role/role.entity";

@Entity()
export class User extends BaseEntity {
  @Property()
  name!: string;

  @Property()
  email!: string;

  @Property()
  password!: string;

  @Property()
  role!: Role;

  @Property()
  phone!: string;

  @Property()
  address!: string;

  @Property()
  country!: string;

  @Property()
  city!: string;

  @Property()
  postalCode!: string;

  @Property()
  state!: string;

  @Property({ type: "text", lazy: true })
  avatar = "";
}
