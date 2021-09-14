import Koa, { DefaultState, DefaultContext } from "koa";

import { env, wait } from "./utils";
import { Server } from "http";

import { connectWithDatabase, router } from "./config";
import { Connection } from "typeorm";

const port = env.number("SERVER_PORT") || 5000;
const host = env.string("SERVER_HOST") || "localhost";

export class App {
  app: Koa<DefaultState, DefaultContext>;
  server: Server;
  connection: Connection;
  constructor() {
    this.app = new Koa();
    this.setup();
  }

  private setup() {
    this.app.use(router.routes()).use(router.allowedMethods());
    this.run(port, host);
  }

  run(port: number, host: string) {
    this.server = this.app.listen(port, host, () => {
      console.log(
        "Server is up and running 🚀".gray,
        "\nTo access the server ⚡️, go to:".gray,
        `http://${host}:${port}`.blue.bold,
        "\n-----------------------------------------------------".blue
      );
    });
  }
}
