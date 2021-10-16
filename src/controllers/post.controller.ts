import { Context } from 'koa';
import { Dependencies } from '../@types/dependencies';
import { IContext } from '../@types/koa';
import {
  IPagination,
  IPostCreateDto,
  IPostCreateServiceDto,
} from '../@types/post.types';
import { UserRole } from '../@types/user.types';
import { Failure } from '../helpers/failure';
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

  create = async (ctx: IContext): Promise<void> => {
    if (!ctx.state.user) throw Failure.unAuthorized();
    if (ctx.state.user.role !== UserRole.admin) throw Failure.forbidden();

    const {
      body,
      keywords,
      title,
      thumbnail,
    } = ctx.request.body as IPostCreateDto;

    const dto: IPostCreateServiceDto = {
      body,
      keywords,
      title,
      thumbnail,
      author: ctx.state.user,
      publishedAt: new Date(),
    };

    const response = await this.postService.create(dto);

    ctx.status = 201;
    ctx.body = response;
  };
}
