import { Context, Next } from 'koa';
import { Failure } from '../helpers/failure';

export const errorHandler = async (ctx: Context, next: Next): Promise<void> => {
  try {
    await next();
  } catch (error) {
    if (error instanceof Failure) {
      const {
        message,
        statusCode,
        errorCode,
        constraint,
      } = error;

      ctx.status = statusCode;
      ctx.body = {
        error: true,
        statusCode,
        errorCode,
        [Array.isArray(message) ? 'messages' : 'message']: message,
        constraint,
      };
      return;
    }

    ctx.status = 500;
  }
};
