import * as Awilix from 'awilix';
import { Connection } from 'typeorm';

import { AuthController, UserController } from './controllers';
import { AuthService, UserService } from './services';
import { TokenRepository, UserRepository } from './repositories';
import { DIKeys } from './@types/dependencies';

const Container = Awilix.createContainer({
  injectionMode: Awilix.InjectionMode.PROXY,
});

// ? Remember to add in Depedencies interface
const setupInjections = (database: Connection): void => {
  const di: DIKeys<Awilix.Resolver<unknown>> = {
    authController: Awilix.asClass(AuthController),
    userController: Awilix.asClass(UserController),
    authService: Awilix.asClass(AuthService),
    userService: Awilix.asClass(UserService),
    userRepository: Awilix.asClass(UserRepository),
    tokenRepository: Awilix.asClass(TokenRepository),
    database: Awilix.asValue(database),
  };

  Container.register(di);
};

export { Container, setupInjections };
