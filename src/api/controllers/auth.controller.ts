import { Context } from "koa";
import { AuthService } from "../services";

import { Dependencies } from "../../injection";

export class AuthController {
  private _service: AuthService;
  constructor({ authService }: Dependencies) {
    this._service = authService;

    this.register = this.register.bind(this);
  }

  async register(ctx: Context): Promise<void> {
    try {
      const response = await this._service.register(ctx.request.body);
      ctx.body = response;
    } catch (e: any) {
      ctx.throw(e.message);
    }
  }
}
