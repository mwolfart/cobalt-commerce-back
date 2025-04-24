import { IUserRepository } from "../../domain/repositories/i.user.repository";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import { User } from "../../domain/entities/user/user.entity";
import { AuthDto } from "../dtos/auth.dto";
import { ValidationError } from "@mikro-orm/core";

export class AuthService {
  constructor(private readonly userRepository: IUserRepository) {}

  async validateUser(email: string, password: string): Promise<User | false> {
    const user = await this.userRepository.findUserByEmail(email);
    if (!user) {
      return false;
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);

    if (!isPasswordValid) {
      return false;
    }

    return user;
  }

  async authenticateAndGetToken({ email, password }: AuthDto) {
    if (!email || !password) {
      throw new ValidationError("Invalid credentials");
    }

    const user = await this.validateUser(email, password);
    if (!user) {
      throw new ValidationError("Invalid credentials");
    }

    const secretKey = process.env.JWT_SECRET;
    if (!secretKey) {
      throw new ValidationError("Invalid credentials");
    }

    const token = jwt.sign(
      { name: user.name, email, role: user.role.name, sub: user.uuid },
      secretKey,
      {
        expiresIn: "600s",
      },
    );

    return { access_token: token };
  }

  validateToken(authorization: string) {
    if (!authorization || authorization.split(" ").length < 2) {
      return false;
    }
    const token = authorization.split(" ")[1];
    if (!token) {
      return false;
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
        email: string;
        name: string;
        role: string;
        sub: string;
      };

      if (!decoded) {
        return false;
      }
      return decoded;
    } catch (error) {
      return false;
    }
  }

  validateRole(authorization: string, role: string) {
    const decoded = this.validateToken(authorization);

    if (!decoded) {
      return false;
    }

    if (decoded.role !== role) {
      return false;
    }

    return true;
  }
}
