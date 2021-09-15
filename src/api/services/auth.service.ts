import { UsersEntity } from "../../entities";
import { Dependencies } from "../../injection";
import { UserRepository } from "../repositories";

export class AuthService {
  readonly _repo: UserRepository;
  constructor({ userRepository }: Dependencies) {
    this._repo = userRepository;

    this.register = this.register.bind(this);
  }

  async register(body: any): Promise<UsersEntity> {
    return this._repo.create(body);
  }
}
