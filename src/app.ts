import Koa, { DefaultState, DefaultContext } from "koa";
import bodyParser from "koa-bodyparser";
import { Server } from "http";
import { Connection } from "typeorm";
import { env } from "@dolanites/utils.js";

import { router } from "./config";
import { logger } from "./utils";

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
    this.app.use(
      bodyParser({
        enableTypes: ["json", "form"],
      })
    );
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
