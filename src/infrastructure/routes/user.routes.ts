import { Router } from "express";
import getDB from "../database/db";
import { UserService } from "../../application/services/user.service";
import { UserController } from "../controller/user.controller";
import { AuthService } from "../../application/services/auth.service";

export const createUserRoutes = async () => {
  const router = Router();
  const { userRepository, roleRepository } = await getDB();

  const authService = new AuthService(userRepository);
  const userService = new UserService(userRepository, roleRepository);
  const userController = new UserController(userService, authService);

  router.post("/", userController.createUser.bind(userController));

  return router;
};
