import { ValidationError } from "@mikro-orm/core";
import { Request, Response } from "express";
import { UserService } from "../../application/services/user.service";
import { AuthService } from "../../application/services/auth.service";

export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  async createUser(req: Request, res: Response): Promise<void> {
    const authorization = req.headers.authorization;
    const hasValidToken = this.authService.validateToken(
      authorization as string,
    );
    if (!hasValidToken) {
      res.status(401).json({ message: "unauthorized" });
      return;
    }

    const canAccess = this.authService.validateRole(
      authorization as string,
      "admin",
    );
    if (!canAccess) {
      res.status(403).json({ message: "forbidden" });
      return;
    }

    const payload = req.body;
    try {
      const user = await this.userService.createUser(payload);
      res.status(201).json({ data: user });
    } catch (error) {
      if (error instanceof ValidationError) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: "internal server error" });
      }
    }
  }
}
