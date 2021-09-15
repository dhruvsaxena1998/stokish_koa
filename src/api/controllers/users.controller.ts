import { Context } from "koa";
import { UserService } from "../services";

import { Dependencies } from "../../injection";

export class UserController {
  private _service: UserService;
  constructor({ userService }: Dependencies) {
    this._service = userService;
  }

  findOne = async (ctx: Context): Promise<void> => {
    ctx.body = await this._service.findOne(+ctx.params.id);
  };

  create = async (ctx: Context): Promise<void> => {
    try {
      const response = await this._service.create(ctx.request.body);
      ctx.body = response;
    } catch (e) {
      ctx.throw("Something went wrong!", 500);
    }
  };
}
