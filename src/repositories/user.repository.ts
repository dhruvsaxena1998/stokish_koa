import { SharedRepository } from './shared.repository';
import { UserEntity } from '../entities/user.entity';
import { Dependencies } from '../@types/dependencies';

export class UserRepository extends SharedRepository<UserEntity> {
  constructor({ database }: Dependencies) {
    super(database.getRepository(UserEntity));

    this.findOneByIdentifier = this.findOneByIdentifier.bind(this);
  }

  async findOneByIdentifier(
    identifier: string,
  ): Promise<UserEntity | undefined> {
    return this.findOne({
      where: [{ username: identifier }, { email: identifier }],
    });
  }
}

export default UserRepository;
