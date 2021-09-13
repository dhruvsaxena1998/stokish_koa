import * as Awilix from "awilix";

import { UserController } from "./controllers/users.controller";

const container = Awilix.createContainer({
  injectionMode: Awilix.InjectionMode.PROXY,
});

const registerContainer = () => {
  container.register({
    userController: Awilix.asClass(UserController),
  });
};

export { container, registerContainer };
