import { env } from '@dolanites/utils';
import { createConnection, Connection, ConnectionOptions } from 'typeorm';

import { PostEntity, TokenEntity, UserEntity } from '../entities';
import { logger } from '../utils/instance';

const {
  DB_HOST = 'localhost',
  DB_PORT = 5432,
  DB_USER = 'postgres',
  DB_PASS = 'root',
  DB_NAME = 'stokish',
} = process.env;

const entities = [PostEntity, TokenEntity, UserEntity];

export const connectWithDatabase = async (): Promise<Connection> => {
  const options: ConnectionOptions = {
    type: 'postgres',
    database: DB_NAME,
    host: DB_HOST,
    port: +DB_PORT,
    username: DB_USER,
    password: DB_PASS,
    entities,
  };

  const connection = await createConnection(options);

  await connection.synchronize(env.node_env === 'development');

  logger.debug(`Connected to ${options.type}:${options.database}`);
  return connection;
};

export default connectWithDatabase;
