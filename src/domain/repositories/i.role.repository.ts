import { Role } from "../entities/role/role.entity";

export interface IRoleRepository {
  findRoleByName(name: string): Promise<Role | null>;
}
