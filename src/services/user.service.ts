import { Dependencies } from '../@types/dependencies';
import { UserRepository } from '../repositories/user.repository';

export class UserService {
  readonly userRepository: UserRepository;

  constructor({ userRepository }: Dependencies) {
    this.userRepository = userRepository;
  }
}

export default UserService;
