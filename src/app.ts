import Koa, { DefaultState, DefaultContext } from "koa";
import { logger, ENV } from "@dolanites/utils.js";

import { Server } from "http";

import { router } from "./config";
import { Connection } from "typeorm";

const port = ENV.number("SERVER_PORT") || 5000;
const host = ENV.string("SERVER_HOST") || "localhost";

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

  run(port: number, host: string): void {
    this.server = this.app.listen(port, host, () => {
      logger.debug("Server is up and running");
      logger.debug(`To access the server, go to: http://${host}:${port}`);
    });
  }
}
