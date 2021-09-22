import { Context } from 'koa';
import { UserService } from '../services';

import { Dependencies } from '../@types/dependencies';
import { Failure } from '../helpers/failure';

export class UserController {
  private userService: UserService;

  constructor({ userService }: Dependencies) {
    this.userService = userService;
  }

  me = async (ctx: Context): Promise<void> => {
    if (!ctx.state.user) {
      throw Failure.forbidden();
    }

    ctx.status = 200;
    ctx.body = ctx.state.user;
  };
}

export default UserController;
