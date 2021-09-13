import Koa, { DefaultState, DefaultContext } from "koa";
import { createConnection, Connection, ConnectionOptions } from "typeorm";

import { config } from "dotenv";
import { ENV, kEnv } from "../utils";

import { UsersEntity } from "../entities";
config();

const {
  DB_HOST = "localhost",
  DB_PORT = 5432,
  DB_USER = "postgres",
  DB_PASS = "root",
  DB_NAME = "stokish",
} = process.env;

const entities = [UsersEntity];

export const connectWithDatabase = async (
  app: Koa<DefaultState, DefaultContext>
): Promise<Connection> => {
  const options: ConnectionOptions = {
    type: "postgres",
    database: DB_NAME,
    host: DB_HOST,
    port: +DB_PORT!,
    username: DB_USER,
    password: DB_PASS,
    entities,
  };

  const connection = await createConnection(options);
  app.context.database = connection;

  await connection.synchronize(kEnv() === ENV.development);

  console.log("\n----------- Connected -----------".green.bold);
  console.log(`Connected to ${options.type}:${options.database}`.green);
  console.log("---------------------------------\n".green.bold);
  return connection;
};
