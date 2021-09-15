import { RouterContext } from "@koa/router";
import { UserService } from "../services";

import { Dependencies } from "../../injection";

export class UserController {
  private _service: UserService;
  constructor({ userService }: Dependencies) {
    this._service = userService;
  }

  findOne = async (ctx: RouterContext): Promise<void> => {
    ctx.body = await this._service.findOne(+ctx.params.id);
  };
}
