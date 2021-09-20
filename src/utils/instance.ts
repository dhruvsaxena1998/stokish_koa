// Validator
import Ajv from "ajv";
import useFormats from "ajv-formats";

const ajv = new Ajv({ allErrors: true });
useFormats(ajv);

// Logger
import { logger as Logger, env } from "@dolanites/utils";
const logger = Logger();

// Crypt
import bcrypt from "bcrypt";

const hash = async (value: string, rounds = 12): Promise<string> => {
  const salt = await bcrypt.genSalt(rounds);
  return bcrypt.hash(value, salt);
};

const compare = async (value: string, encrypted = ""): Promise<boolean> => {
  return bcrypt.compare(value, encrypted);
};

// JWT
import { verify, sign, JwtPayload } from "jsonwebtoken";
const secret = env.string("JWT_SECRET", "");

export interface IJwtPayload extends JwtPayload {
  sub: string;
  body: { user: string; role: string };
}
const signJwt = (payload: IJwtPayload): string => {
  const { iss = env.string("SERVER_URL", ""), body, sub, ...rest } = payload;

  return sign({ sub, body, ...rest }, secret, {
    issuer: iss,
    expiresIn: env.string("JWT_EXPIRES", "30d"),
  });
};
const verifyJWT = (token: string): JwtPayload => {
  return <JwtPayload>verify(token, secret);
};

export { ajv, logger, hash, compare, verifyJWT, signJwt };
