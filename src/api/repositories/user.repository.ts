import { Repository } from "typeorm";
import { SharedRepository } from "./shared.repository";
import { UsersEntity } from "../../entities";
import { Dependencies } from "../../injection";

export class UserRepository extends SharedRepository<UsersEntity> {
  private readonly _userEntity: Repository<UsersEntity>;
  constructor({ database }: Dependencies) {
    const entity = database.getRepository(UsersEntity);
    super(entity);
    this._userEntity = entity;
  }
}
