import { Connection } from "typeorm";
import { AuthController, UserController } from "../api/controllers";
import { UserRepository } from "../api/repositories";
import { AuthService, UserService } from "../api/services";

export interface Dependencies {
  database: Connection;
  authController: AuthController;
  userController: UserController;
  authService: AuthService;
  userService: UserService;
  userRepository: UserRepository;
}
