import { env } from '@dolanites/utils/lib';
import { Context, Next } from 'koa';
import { RateLimiterRedis } from 'rate-limiter-flexible';
import { client } from '../helpers/cache';

import { Failure } from '../helpers/failure';

const limiter = new RateLimiterRedis({
  storeClient: client,
  keyPrefix: 'middleware',
  points: env.number('RATELIMIT_HITS', 20),
  duration: env.number('RATELIMIT_DURATION', 60),
});

export type RateLimitMiddleware = (ctx: Context, next: Next) => Promise<void>;

export const rateLimiter = (
  points?: number,
  duration?: number,
): RateLimitMiddleware => {
  if (points) limiter.points = points;
  if (duration) limiter.duration = duration;

  return async (ctx: Context, next: Next) => {
    try {
      await limiter.consume(ctx.ip);
      // eslint-disable-next-line @typescript-eslint/return-await
      return next();
    } catch (e) {
      throw Failure.limited();
    }
  };
};
