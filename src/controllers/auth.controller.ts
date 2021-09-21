import { Context } from 'koa';
import { AuthService } from '../services';

import { Dependencies } from '../@types/dependencies';
import { Failure } from '../helpers/failure';

export class AuthController {
  private authService: AuthService;

  constructor({ authService }: Dependencies) {
    this.authService = authService;
  }

  registerViaEmail = async (ctx: Context): Promise<void> => {
    try {
      const response = await this.authService.registerViaEmail(
        ctx.request.body,
      );
      ctx.status = 201;
      ctx.body = response;
    } catch (e) {
      const { message } = <Error>e;

      if (message.includes('duplicate')) {
        throw Failure.badRequest('Duplicate value for unique constraint');
      }

      throw e;
    }
  };

  loginViaIdentifier = async (ctx: Context): Promise<void> => {
    const response = await this.authService.loginViaIdentifier(
      ctx.request.body,
    );
    ctx.status = 200;
    ctx.body = response;
  };

  connectViaMagicLink = async (ctx: Context): Promise<void> => {
    const response = await this.authService.connectViaMagicLink(
      ctx.request.body,
    );
    ctx.status = 200;
    ctx.body = response;
  };
}

export default AuthController;
