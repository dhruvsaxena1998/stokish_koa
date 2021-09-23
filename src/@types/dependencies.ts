import { Connection } from 'typeorm';
import { AuthController, PostController, UserController } from '../controllers';
import { PostRepository, TokenRepository, UserRepository } from '../repositories';
import { AuthService, PostService, UserService } from '../services';

type DepedenciesKeys =
  | 'database'
  | 'authController'
  | 'postController'
  | 'userController'
  | 'authService'
  | 'postService'
  | 'userService'
  | 'userRepository'
  | 'tokenRepository'
  | 'postRepository';

export type DIKeys<T> = {
  [key in DepedenciesKeys]: T;
};

export class Dependencies implements DIKeys<unknown> {
  database: Connection;
  authController: AuthController;
  postController: PostController;
  userController: UserController;
  authService: AuthService;
  postService: PostService;
  userService: UserService;
  userRepository: UserRepository;
  postRepository: PostRepository;
  tokenRepository: TokenRepository;
}
