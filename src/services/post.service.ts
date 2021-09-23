import { Dependencies } from '../@types/dependencies';
import { IPagination, PostsPaginated } from '../@types/post.types';
import { PostRepository } from '../repositories/post.repository';

export class PostService {
  readonly postRepository: PostRepository;
  constructor({ postRepository }: Dependencies) {
    this.postRepository = postRepository;
  }

  findAndPaginate = async (pagination: IPagination): Promise<PostsPaginated> => {
    const { start = 0, limit = 10 } = pagination;

    const [entities, count] = await this.postRepository.findAndCount({
      skip: start,
      take: limit,
    });

    return { entities, count };
  };
}
