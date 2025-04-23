import { AuthService } from "src/application/services/auth.service";
import getDB from "../database/db";
import { AuthController } from "../controller/auth.controller";
import { Router } from "express";

export const createAuthRoutes = async () => {
  const router = Router();
  const { userRepository } = await getDB();

  const authService = new AuthService(userRepository);
  const authController = new AuthController(authService);

  router.post("/", authController.authenticate.bind(authController));

  return router;
};
