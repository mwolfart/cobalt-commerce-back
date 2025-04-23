import { ValidationError } from "@mikro-orm/core";
import { Request, Response } from "express";
import { AuthService } from "../../application/services/auth.service";

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  async authenticate(req: Request, res: Response): Promise<void> {
    const payload = req.body;
    try {
      const token = await this.authService.authenticateAndGetToken(payload);
      res.status(201).json(token);
    } catch (error) {
      if (error instanceof ValidationError) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: "internal server error" });
      }
    }
  }
}
