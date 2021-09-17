import { Context } from "koa";
import { AuthService } from "../services";

import { Dependencies } from "../../injection";
import { Failure } from "../../helpers/failure";

export class AuthController {
  private _service: AuthService;
  constructor({ authService }: Dependencies) {
    this._service = authService;

    this.registerViaEmail = this.registerViaEmail.bind(this);
    this.loginViaIdentifier = this.loginViaIdentifier.bind(this);
  }

  async registerViaEmail(ctx: Context): Promise<void> {
    try {
      const response = await this._service.registerViaEmail(ctx.request.body);
      ctx.status = 201;
      ctx.body = response;
    } catch (e) {
      const { message } = <Error>e;

      if (message.includes("duplicate")) {
        throw Failure.badRequest("Duplicate value for unique constraint");
      }

      throw e;
    }
  }

  async loginViaIdentifier(ctx: Context): Promise<void> {
    try {
      const response = await this._service.loginViaIdentifier(ctx.request.body);
      ctx.status = 200;
      ctx.body = response;
    } catch (e) {
      throw e;
    }
  }
}
