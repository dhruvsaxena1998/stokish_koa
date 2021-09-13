import Koa from "koa";

import { config } from "dotenv";
import { env } from "./utils";

import { connectWithDatabase } from "./config";

config();

export const runApp = async () => {
  const app: Koa<Koa.DefaultState, Koa.DefaultContext> = new Koa();

  await connectWithDatabase(app);

  const port = env.number("SERVER_PORT", 5000);
  const host = env.string("SERVER_HOST", "localhost");
  app.listen(port, host).on("listening", () => {
    console.log(
      "Server is up and running 🚀,\nTo access the server ⚡️, go to:".gray
    );
    console.log(`http://${host}:${port}`.blue.bold);
  });
};
