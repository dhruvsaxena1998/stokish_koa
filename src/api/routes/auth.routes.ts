import Router from "@koa/router";
import { AuthController } from "../controllers";

import { Container } from "../../injection";

const authController = Container.resolve("authController") as AuthController;
const router = new Router({
  prefix: "/auth",
});

router.post("/register", authController.register);

export { router };
