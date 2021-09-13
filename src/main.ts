import { runApp } from "./app";

// Global modules
import "colors";
import "reflect-metadata";

runApp().catch((e) => {
  console.log("----------- Error -----------".red.bold);
  console.log(e);
  console.log("----------- Error -----------".red.bold);
  process.exit(1);
});
