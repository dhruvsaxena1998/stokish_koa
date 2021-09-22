import { env } from '@dolanites/utils/lib';
import Redis from 'ioredis';

export const client = new Redis({
  port: env.number('REDIS_PORT', 6379),
});

export const { get, set } = client;
