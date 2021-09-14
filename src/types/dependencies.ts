import { Connection } from "typeorm";
import { UserController } from "../api/controllers";
import { UserRepository } from "../api/repositories";
import { UserService } from "../api/services";

export interface Dependencies {
  database: Connection;
  userController: UserController;
  userService: UserService;
  userRepository: UserRepository;
}
