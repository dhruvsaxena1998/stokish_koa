import * as Awilix from "awilix";

import { AuthController, UserController } from "./api/controllers";
import { AuthService, UserService } from "./api/services";
import { UserRepository } from "./api/repositories";
import { Connection } from "typeorm";

const Container = Awilix.createContainer({
  injectionMode: Awilix.InjectionMode.PROXY,
});

// ? Remember to add in Depedencies interface
const setupInjections = (database: Connection): void => {
  Container.register({
    authController: Awilix.asClass(AuthController),
    userController: Awilix.asClass(UserController),
    authService: Awilix.asClass(AuthService),
    userService: Awilix.asClass(UserService),
    userRepository: Awilix.asClass(UserRepository),
    database: Awilix.asValue(database),
  });
};

export { Container, setupInjections };
export { Dependencies } from "./types/dependencies";
