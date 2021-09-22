import { verify } from '../helpers/jsonwebtoken';
import { sanitizeEntity } from '../helpers/sanitize';
import { UserRepository } from '../repositories/user.repository';

import { SanitizedUser } from '../@types/auth.types';
import { Dependencies } from '../@types/dependencies';

export class UserService {
  readonly userRepository: UserRepository;

  constructor({ userRepository }: Dependencies) {
    this.userRepository = userRepository;
  }

  me = async (token: string): Promise<SanitizedUser | null> => {
    try {
      const { sub } = verify(token);
      const user = await this.userRepository.findById(+sub);

      if (!user) {
        return null;
      }

      return sanitizeEntity('users', user) as SanitizedUser;
    } catch (e) {
      return null;
    }
  };
}

export default UserService;
