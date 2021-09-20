import { Dependencies } from "../injection";
import { UserRepository } from "../repositories/user.repository";

export class UserService {
  readonly _repo: UserRepository;
  constructor({ userRepository }: Dependencies) {
    this._repo = userRepository;
  }
}
