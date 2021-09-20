import bcrypt from "bcrypt";
import { env } from "@dolanites/utils";
import { UserRepository } from "../repositories/user.repository";

import { Dependencies } from "../injection";

import { Failure } from "../helpers/failure";
import { sign } from "../helpers/jsonwebtoken";
import { sanitizeEntity } from "../helpers/sanitize";

import {
  IAuthInfo,
  ILoginViaIdentifierDto,
  IRegisterViaEmailDto,
} from "../@types/auth.types";
import { SanitizedUser } from "../@types/user.types";

export class AuthService {
  readonly _repo: UserRepository;
  constructor({ userRepository }: Dependencies) {
    this._repo = userRepository;

    this.registerViaEmail = this.registerViaEmail.bind(this);
    this.loginViaIdentifier = this.loginViaIdentifier.bind(this);
  }

  async registerViaEmail(body: IRegisterViaEmailDto): Promise<IAuthInfo> {
    const salt = await bcrypt.genSalt(env.number("SALT_ROUNDS", 13));
    body.password = await bcrypt.hash(body.password, salt);

    const user = await this._repo.createInstance(body);
    await this._repo.create(null, user);

    const sanitizedUser = sanitizeEntity("users", user) as SanitizedUser;

    const jwt = sign({
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

    const isValidPassword = await bcrypt.compare(body.password, user.password);
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

    const token = sign({
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
