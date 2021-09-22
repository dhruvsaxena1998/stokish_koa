import { UserService } from '../services';
import { Failure } from '../helpers/failure';

import { IContext } from '../@types/koa';
import { Dependencies } from '../@types/dependencies';

export class UserController {
  private userService: UserService;

  constructor({ userService }: Dependencies) {
    this.userService = userService;
  }

  me = async (ctx: IContext): Promise<void> => {
    if (!ctx.state.user) {
      throw Failure.forbidden();
    }

    ctx.status = 200;
    ctx.body = ctx.state.user;
  };
}
