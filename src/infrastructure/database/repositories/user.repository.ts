import { EntityManager } from "@mikro-orm/postgresql";
import { Role } from "../../../domain/entities/role/role.entity";
import { User } from "../../../domain/entities/user/user.entity";
import { IUserRepository } from "../../../domain/repositories/i.user.repository";

export class UserRepository implements IUserRepository {
  constructor(private readonly em: EntityManager) {}

  async createUser(
    name: string,
    email: string,
    passwordHash: string,
    role: Role,
    phone: string,
    address: string,
    country: string,
    city: string,
    postalCode: string,
    state: string,
  ): Promise<User> {
    const user = new User();
    user.name = name;
    user.email = email;
    user.password = passwordHash;
    user.role = role;
    user.phone = phone;
    user.address = address;
    user.country = country;
    user.city = city;
    user.postalCode = postalCode;
    user.state = state;

    await this.em.persistAndFlush(user);
    return user;
  }

  async findUserByEmail(email: string): Promise<User | null> {
    const user = await this.em.findOne(User, { email });
    return user || null;
  }
}
