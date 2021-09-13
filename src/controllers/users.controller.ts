import { Context } from "koa";

export class UserController {
  async find(ctx: Context) {
    ctx.body = "Find all users";
  }
}
