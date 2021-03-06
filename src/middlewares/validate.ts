import { ValidateFunction } from 'ajv';
import { Context, Next } from 'koa';
import { Failure } from '../helpers/failure';

export const validate =
  (validator: ValidateFunction) =>
    async (ctx: Context, next: Next): Promise<void> => {
      if (!validator(ctx.request.body)) {
        throw Failure.badRequest(validator.errors || []);
      }
      return next();
    };

export const validateQuery =
  (validator: ValidateFunction) =>
    async (ctx: Context, next: Next): Promise<void> => {
      if (!validator(ctx.request.query)) {
        throw Failure.badRequest(validator.errors || []);
      }

      return next();
    };
