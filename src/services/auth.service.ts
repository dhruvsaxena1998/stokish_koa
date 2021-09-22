import bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';
import { env } from '@dolanites/utils';
import { UserRepository } from '../repositories/user.repository';

import { Dependencies } from '../@types/dependencies';

import { Failure } from '../helpers/failure';
import { sign } from '../helpers/jsonwebtoken';
import { sanitizeEntity } from '../helpers/sanitize';

import {
  IAuthInfo,
  IConnectViaMagicLinkDto,
  ILoginViaIdentifierDto,
  IRegisterViaEmailDto,
  IVerifyViaMagicLinkDto,
  SanitizedUser,
} from '../@types/auth.types';
import { TokenRepository } from '../repositories';
import { TokenEntity } from '../entities';
import { logger } from '../utils/instance';
import { Constants } from '../utils/constants';

export class AuthService {
  readonly userRepository: UserRepository;

  readonly tokenRepository: TokenRepository;

  constructor({ userRepository, tokenRepository }: Dependencies) {
    this.userRepository = userRepository;
    this.tokenRepository = tokenRepository;

    this.registerViaEmail = this.registerViaEmail.bind(this);
    this.loginViaIdentifier = this.loginViaIdentifier.bind(this);
    this.connectViaMagicLink = this.connectViaMagicLink.bind(this);
  }

  async registerViaEmail(body: IRegisterViaEmailDto): Promise<IAuthInfo> {
    const salt = await bcrypt.genSalt(env.number('SALT_ROUNDS', 13));
    const dto = { ...body, password: await bcrypt.hash(body.password, salt) };

    const user = await this.userRepository.createInstance(dto);
    await this.userRepository.create(null, user);

    const sanitizedUser = sanitizeEntity('users', user) as SanitizedUser;

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
    const user = await this.userRepository.findOneByIdentifier(body.identifier);

    if (!user) {
      throw Failure.notFound('Username/Email not found!', [
        'username',
        'email',
      ]);
    }

    const isValidPassword = await bcrypt.compare(body.password, user.password);
    if (!isValidPassword) {
      throw Failure.badRequest('Identifier or password invalid!', [
        'username',
        'email',
        'password',
      ]);
    }

    if (user.blocked) {
      throw Failure.forbidden('Your account is blocked', ['blocked']);
    }

    const sanitizedUser = sanitizeEntity('users', user) as SanitizedUser;

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

  async connectViaMagicLink(
    body: IConnectViaMagicLinkDto,
  ): Promise<Partial<SanitizedUser>> {
    let user = await this.userRepository.findOneByIdentifier(body.email);
    let token: TokenEntity | undefined;

    const magicToken = randomBytes(Constants.magicTokenBytes).toString('hex');

    if (!user) {
      user = await this.userRepository.create(body);
      token = await this.tokenRepository.create({ magicToken, user });
    } else {
      const existedToken = await this.tokenRepository.findOne({
        where: {
          user: user.id,
        },
      });

      if (!existedToken) {
        logger.error('Failed to find existed token');
        throw Failure.internalServer();
      }

      token = await this.tokenRepository.update(existedToken.id, {
        magicToken,
      });
    }

    logger.info(token.magicToken);
    // TODO: Send email (token.magicToken)

    return {
      email: user.email,
      blocked: user.blocked,
      role: user.role,
    };
  }

  verifyViaMagicLink = async (
    body: IVerifyViaMagicLinkDto,
  ): Promise<IAuthInfo> => {
    /*
     * Steps:
     *  1. Get token from body
     *  2. Find token in TokenEntity
     *  3. If token exists get the user from it and make token null
     *  4. Sanitize user
     *  5. Create jwt from user data
     *  6. Return jwt and user data
     */

    const token = await this.tokenRepository.findOne({
      where: {
        magicToken: body.token,
      },
    });

    if (!token) {
      throw Failure.badRequest('Invalid token', ['token']);
    }

    const user = await this.userRepository.findById(token.userId);
    if (!user) {
      throw Failure.forbidden();
    }

    const sanitizedUser = sanitizeEntity('users', user) as SanitizedUser;

    const jwt = sign({
      sub: String(sanitizedUser.id),
      body: {
        user: sanitizedUser.username,
        role: sanitizedUser.role,
      },
    });

    // Remove token after creating jwt
    this.tokenRepository.update(token.id, {
      magicToken: null,
    });

    return {
      jwt,
      user: sanitizedUser,
    };
  };
}
