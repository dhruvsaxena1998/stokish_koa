import { Connection, Repository } from "typeorm";
import { SharedRepository } from "./shared.repository";
import { UsersEntity } from "../../entities";
import { Container, Dependencies } from "../../injection";

const database: Connection = Container.resolve("database");
const entity = database.getRepository(UsersEntity);

export class UserRepository extends SharedRepository<UsersEntity> {
  private readonly _userEntity: Repository<UsersEntity>;
  constructor() {
    super(entity);
    this._userEntity = entity;
  }
}
