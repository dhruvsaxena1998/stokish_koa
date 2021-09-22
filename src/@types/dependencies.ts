import { Connection } from 'typeorm';
import { AuthController, UserController } from '../controllers';
import { TokenRepository, UserRepository } from '../repositories';
import { AuthService, UserService } from '../services';

type DepedenciesKeys =
  | 'database'
  | 'authController'
  | 'userController'
  | 'authService'
  | 'userService'
  | 'userRepository'
  | 'tokenRepository';

export type DIKeys<T> = {
  [key in DepedenciesKeys]: T;
};

export class Dependencies implements DIKeys<unknown> {
  database: Connection;
  authController: AuthController;
  userController: UserController;
  authService: AuthService;
  userService: UserService;
  userRepository: UserRepository;
  tokenRepository: TokenRepository;
}
