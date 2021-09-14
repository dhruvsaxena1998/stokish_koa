import { Dependencies } from "../../injection";
import { UserRepository } from "../repositories";

export class UserService {
  readonly _repo: UserRepository;
  constructor({ userRepository }: Dependencies) {
    this._repo = userRepository;
  }
  findOne = async (id: number) => {
    return this._repo.findOne(id);
  };
}
