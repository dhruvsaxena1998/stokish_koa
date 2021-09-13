import Router from "@koa/router";
import { container } from "../injector";
import { UserController } from "../controllers/users.controller";

const controller = container.resolve("userController") as UserController;

const router = new Router();

router.get("/", controller.find);

export { router };
