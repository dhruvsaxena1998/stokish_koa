import { Connection } from 'typeorm';
import { AuthController, UserController } from '../controllers';
import { TokenRepository, UserRepository } from '../repositories';
import { AuthService, UserService } from '../services';

export interface Dependencies {
  database: Connection;
  authController: AuthController;
  userController: UserController;
  authService: AuthService;
  userService: UserService;
  userRepository: UserRepository;
  tokenRepository: TokenRepository;
}
