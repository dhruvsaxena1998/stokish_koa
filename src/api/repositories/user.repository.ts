import { SharedRepository } from "./shared.repository";
import { UsersEntity } from "../../entities";
import { Dependencies } from "../../injection";

export class UserRepository extends SharedRepository<UsersEntity> {
  constructor({ database }: Dependencies) {
    super(database.getRepository(UsersEntity));
  }
}
