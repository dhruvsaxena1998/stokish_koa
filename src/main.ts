import { config } from "dotenv";
config();

import { setupInjections } from "./injection";
import { connectWithDatabase } from "./config/database.config";

import "colors";
import "reflect-metadata";

connectWithDatabase().then(async (db) => {
  setupInjections(db);

  const { App } = await import("./app");
  new App();
});
