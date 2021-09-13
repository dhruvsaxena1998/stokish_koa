import Koa, { DefaultState, DefaultContext } from "koa";

import { config } from "dotenv";
config();

import { env } from "./utils";
import { Server } from "http";

import { router } from "./routes/user.routes";
import { connectWithDatabase } from "./config";

const port = env.number("SERVER_PORT") || 5000;
const host = env.string("SERVER_HOST") || "localhost";

export class App {
  app: Koa<DefaultState, DefaultContext>;
  server: Server;
  constructor() {
    this.app = new Koa();
    this.setup();
  }

  private async setup() {
    await connectWithDatabase();
    this.app.use(router.routes()).use(router.allowedMethods());
    this.run(port, host);
  }

  run(port: number, host: string) {
    this.server = this.app.listen(port, host, () => {
      console.log(
        "Server is up and running 🚀,\nTo access the server ⚡️, go to:".gray
      );
      console.log(`http://${host}:${port}`.blue.bold);
    });
  }
}
