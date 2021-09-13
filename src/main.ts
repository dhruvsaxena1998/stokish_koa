import { runApp } from "./app";
import "colors";
import "reflect-metadata";

runApp().catch((e) => {
  console.log("----------- Error -----------".red.bold);
  console.log(e);
  console.log("----------- Error -----------".red.bold);
  process.exit(1);
});
