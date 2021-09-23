import {
  createContainer,
  InjectionMode,
  asClass,
  asValue,
  Resolver,
} from 'awilix';
import { Connection } from 'typeorm';

import { AuthController, PostController, UserController } from './controllers';
import { AuthService, PostService, UserService } from './services';
import {
  PostRepository,
  TokenRepository,
  UserRepository,
} from './repositories';
import { DIKeys } from './@types/dependencies';

const Container = createContainer({
  injectionMode: InjectionMode.PROXY,
});

// ? Remember to add in Depedencies interface
const setupInjections = (database: Connection): void => {
  const di: DIKeys<Resolver<unknown>> = {
    authController: asClass(AuthController),
    postController: asClass(PostController),
    userController: asClass(UserController),
    authService: asClass(AuthService),
    postService: asClass(PostService),
    userService: asClass(UserService),
    userRepository: asClass(UserRepository),
    postRepository: asClass(PostRepository),
    tokenRepository: asClass(TokenRepository),
    database: asValue(database),
  };

  Container.register(di);
};

export { Container, setupInjections };
