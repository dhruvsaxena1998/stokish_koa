import { SharedRepository } from "./shared.repository";
import { UsersEntity } from "../entities/user.entity";
import { Dependencies } from "../injection";

export class UserRepository extends SharedRepository<UsersEntity> {
  constructor({ database }: Dependencies) {
    super(database.getRepository(UsersEntity));

    this.findOneByIdentifier = this.findOneByIdentifier.bind(this);
  }

  async findOneByIdentifier(
    identifier: string
  ): Promise<UsersEntity | undefined> {
    return this.findOne({
      where: [{ username: identifier }, { email: identifier }],
    });
  }
}
