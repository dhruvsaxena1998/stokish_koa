import { UserService } from '../services';

import { Dependencies } from '../@types/dependencies';

export class UserController {
  private userService: UserService;

  constructor({ userService }: Dependencies) {
    this.userService = userService;
  }
}

export default UserController;
