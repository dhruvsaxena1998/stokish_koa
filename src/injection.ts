import * as Awilix from "awilix";

import { UserController } from "./api/controllers";
import { UserService } from "./api/services";
import { UserRepository } from "./api/repositories";
import { Connection } from "typeorm";

const Container = Awilix.createContainer({
  injectionMode: Awilix.InjectionMode.PROXY,
});

// ? Remember to add in Depedencies interface
const setupInjections = (database: Connection): void => {
  Container.register({
    userController: Awilix.asClass(UserController),
    userService: Awilix.asClass(UserService),
    userRepository: Awilix.asClass(UserRepository),
    database: Awilix.asValue(database),
  });
};

export { Container, setupInjections };
export { Dependencies } from "./types/dependencies";
