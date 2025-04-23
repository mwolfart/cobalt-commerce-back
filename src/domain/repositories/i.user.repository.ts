import { Role } from "../entities/role/role.entity";
import { User } from "../entities/user/user.entity";

export interface IUserRepository {
  createUser(
    name: string,
    email: string,
    password: string,
    role: Role,
    phone: string,
    address: string,
    country: string,
    city: string,
    postalCode: string,
    state: string,
  ): Promise<User>;
  findUserByEmail(email: string): Promise<User | null>;
}
