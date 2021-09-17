import { UserRepository } from "../repositories";

import {
  IAuthInfo,
  ILoginViaIdentifierDto,
  IRegisterViaEmailDto,
} from "../interface";

import { Dependencies } from "../../injection";
import { compare, hash, signJwt } from "../../utils";
import { sanitizeEntity } from "../../utils/sanitize";
import { SanitizedUser } from "../interface/user.interface";
import { Failure } from "../../helpers/failure";

export class AuthService {
  readonly _repo: UserRepository;
  constructor({ userRepository }: Dependencies) {
    this._repo = userRepository;

    this.registerViaEmail = this.registerViaEmail.bind(this);
    this.loginViaIdentifier = this.loginViaIdentifier.bind(this);
  }

  async registerViaEmail(body: IRegisterViaEmailDto): Promise<IAuthInfo> {
    body.password = await hash(body.password);

    const user = await this._repo.createInstance(body);
    await this._repo.create(null, user);

    const sanitizedUser = sanitizeEntity("users", user) as SanitizedUser;

    const jwt = signJwt({
      sub: String(sanitizedUser.id),
      body: {
        user: sanitizedUser.username,
        role: sanitizedUser.role,
      },
    });

    return {
      jwt,
      user: sanitizedUser,
    };
  }

  async loginViaIdentifier(body: ILoginViaIdentifierDto): Promise<IAuthInfo> {
    const user = await this._repo.findOneByIdentifier(body.identifier);

    if (!user) {
      throw Failure.notFound("Username/Email not found!", [
        "username",
        "email",
      ]);
    }

    const isValidPassword = await compare(body.password, user.password);
    if (!isValidPassword) {
      throw Failure.badRequest("Identifier or password invalid!", [
        "username",
        "email",
        "password",
      ]);
    }

    if (user.blocked) {
      throw Failure.forbidden("Your account is blocked", ["blocked"]);
    }

    const sanitizedUser = sanitizeEntity("users", user) as SanitizedUser;

    const token = signJwt({
      sub: String(sanitizedUser.id),
      body: {
        role: sanitizedUser.role,
        user: sanitizedUser.username,
      },
    });

    return {
      jwt: token,
      user: sanitizedUser,
    };
  }
}
