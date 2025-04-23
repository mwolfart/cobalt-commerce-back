import { EntityManager } from "@mikro-orm/postgresql";
import { Role } from "src/domain/entities/role/role.entity";
import { IRoleRepository } from "src/domain/repositories/i.role.repository";

export class RoleRepository implements IRoleRepository {
  constructor(private readonly em: EntityManager) {}

  async findRoleByName(name: string): Promise<Role | null> {
    const role = await this.em.findOne(Role, { name });
    return role || null;
  }
}
