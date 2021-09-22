import { env } from '@dolanites/utils';

import { verify as verifyJWT, sign as signJWT, JwtPayload } from 'jsonwebtoken';

export interface IJwtPayload extends JwtPayload {
  sub: string;
  body: { user: string; role: string };
}

export const sign = (payload: IJwtPayload): string => {
  const {
    iss = env.string('SERVER_URL', ''),
    body,
    sub,
    ...rest
  } = payload;

  return signJWT({ sub, body, ...rest }, env.string('JWT_SECRET', ''), {
    issuer: iss,
    expiresIn: env.string('JWT_EXPIRES', '30d'),
  });
};

export const verify = (token: string): IJwtPayload => <IJwtPayload>verifyJWT(token, env.string('JWT_SECRET', ''));
