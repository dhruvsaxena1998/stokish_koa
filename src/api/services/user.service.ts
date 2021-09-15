import { UsersEntity } from "../../entities";
import { Dependencies } from "../../injection";
import { UserRepository } from "../repositories";

export class UserService {
  readonly _repo: UserRepository;
  constructor({ userRepository }: Dependencies) {
    this._repo = userRepository;
  }
  findOne = async (id: number): Promise<UsersEntity> => {
    return this._repo.findOne(id);
  };

  create = async (body: any): Promise<UsersEntity> => {
    return this._repo.create(body);
  };
}
