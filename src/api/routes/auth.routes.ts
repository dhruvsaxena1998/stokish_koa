import Router from "@koa/router";

import { AuthController } from "../controllers";
import {
  registerViaEmailValidator,
  loginViaIdentifierValidator,
  validateDto,
} from "../middlewares/validators";

import { Container } from "../../injection";
const authController = Container.resolve("authController") as AuthController;

const router = new Router({
  prefix: "/auth",
});

router.post(
  "/local/login",
  validateDto(loginViaIdentifierValidator),
  authController.loginViaIdentifier
);

router.post(
  "/local/register",
  validateDto(registerViaEmailValidator),
  authController.registerViaEmail
);

export { router };
