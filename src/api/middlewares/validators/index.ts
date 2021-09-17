import { ValidateFunction } from "ajv";
import { Context, Next } from "koa";
import { Failure } from "../../../helpers/failure";

export * from "./auth.validator";

export const validateDto =
  (validate: ValidateFunction) =>
  async (ctx: Context, next: Next): Promise<void> => {
    if (!validate(ctx.request.body)) {
      throw Failure.badRequest(validate.errors || []);
    }
    return next();
  };
