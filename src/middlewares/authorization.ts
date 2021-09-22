import { Context, Next } from 'koa';

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
