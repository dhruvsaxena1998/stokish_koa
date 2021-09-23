import { FindManyOptions } from 'typeorm';
import { PostEntity } from '../entities/post.entity';
import { SharedRepository } from './shared.repository';
import { Dependencies } from '../@types/dependencies';

export class PostRepository extends SharedRepository<PostEntity> {
  constructor({ database }: Dependencies) {
    super(database.getRepository(PostEntity));
  }

  findAndCount = async (
    options?: FindManyOptions,
  ): Promise<[PostEntity[], number]> => this.entity.findAndCount(options);
}
