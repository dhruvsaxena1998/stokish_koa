import { Context, Next } from 'koa';
import { IContext } from '../@types/koa';
import { UserRole } from '../@types/user.types';
import { Failure } from '../helpers/failure';

import { Container } from '../injection';
import { UserService } from '../services/user.service';

const userService = Container.resolve('userService') as UserService;

export const authenticate = async (ctx: Context, next: Next): Promise<void> => {
  const authHeaders = ctx.request.headers.authorization;
  if (authHeaders) {
    const [, token] = authHeaders.split(/Bearer\s/);

    if (token && token !== 'undefined') {
      const user = await userService.me(token);
      ctx.state.user = user;
      return next();
    }
  }

  ctx.state.user = null;
  return next();
};

export const authorize =
  (roles: UserRole[]) =>
  /*
   * Steps:
   * 1. use state.user to find user role
   * 2. check if user role exists in given roles
   * 3. if yes continue else forbidden
   */
    async (ctx: IContext, next: Next): Promise<void> => {
      if (!ctx.state.user) throw Failure.forbidden();

      if (!roles.includes(ctx.state.user.role)) throw Failure.unAuthorized();

      return next();
    };
