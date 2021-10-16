import { Dependencies } from '../@types/dependencies';
import {
  IPagination,
  IPostCreateServiceDto,
  PostsPaginated,
} from '../@types/post.types';
import { PostEntity } from '../entities';
import { sanitizeEntity } from '../helpers/sanitize';
import { PostRepository } from '../repositories/post.repository';

export class PostService {
  readonly postRepository: PostRepository;
  constructor({ postRepository }: Dependencies) {
    this.postRepository = postRepository;
  }

  findAndPaginate = async (
    pagination: IPagination,
  ): Promise<PostsPaginated> => {
    const { start = 0, limit = 10 } = pagination;

    const [entities, count] = await this.postRepository.findAndCount({
      skip: start,
      take: limit,
      relations: ['author'],
    });

    return {
      entities: entities.map(
        (entity) => sanitizeEntity('posts', entity) as PostEntity,
      ),
      count,
    };
  };

  create = async (body: IPostCreateServiceDto): Promise<PostEntity> => {
    const entity = await this.postRepository.create(body);

    return sanitizeEntity('posts', entity) as PostEntity;
  };
}
