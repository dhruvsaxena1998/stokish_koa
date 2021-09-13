import { registerContainer } from "./injector";
registerContainer();

import { App } from "./app";
import "colors";
import "reflect-metadata";

new App();
