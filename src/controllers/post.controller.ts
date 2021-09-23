import { Context } from 'koa';
import { Dependencies } from '../@types/dependencies';
import { IPagination } from '../@types/post.types';
import { PostService } from '../services/post.service';

export class PostController {
  private readonly postService: PostService;

  constructor({ postService }: Dependencies) {
    this.postService = postService;
  }

  findAndPaginate = async (ctx: Context): Promise<void> => {
    const { start = 0, limit = 10 } = (<unknown>ctx.query) as IPagination;
    const response = await this.postService.findAndPaginate({
      start,
      limit,
    });

    ctx.status = 200;
    ctx.body = response;
  };
}
