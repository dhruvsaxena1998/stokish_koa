import { UserService } from "../services";

import { Dependencies } from "../injection";

export class UserController {
  private _service: UserService;
  constructor({ userService }: Dependencies) {
    this._service = userService;
  }
}
