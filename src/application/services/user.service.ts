import { ValidationError } from "@mikro-orm/core";
import Joi from "joi";
import * as bcrypt from "bcrypt";
import { CreateUserDto } from "../dtos/create-user.dto";
import { User } from "src/domain/entities/user/user.entity";
import { IUserRepository } from "src/domain/repositories/i.user.repository";
import { IRoleRepository } from "src/domain/repositories/i.role.repository";

export class UserService {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly roleRepository: IRoleRepository,
  ) {}

  private validateCreateUser(payload: CreateUserDto): void {
    const schema = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
      phone: Joi.string().required(),
      address: Joi.string().required(),
      country: Joi.string().required(),
      city: Joi.string().required(),
      postalCode: Joi.string().required(),
      state: Joi.string().required(),
    });

    const { error } = schema.validate(payload);
    if (error) {
      throw new ValidationError(error.message);
    }
  }

  async createUser(payload: CreateUserDto): Promise<User> {
    this.validateCreateUser(payload);
    const role = await this.roleRepository.findRoleByName("User");
    if (!role) {
      throw new ValidationError("Default role not found");
    }

    const passwordHash = bcrypt.hashSync(payload.password, 10);

    const user = await this.userRepository.createUser(
      payload.name,
      payload.email,
      passwordHash,
      role,
      payload.phone,
      payload.address,
      payload.country,
      payload.city,
      payload.postalCode,
      payload.state,
    );
    return user;
  }
}
