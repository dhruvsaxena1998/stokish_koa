import Router from "@koa/router";
// import { UserController } from "../api/controllers";

// import { Container } from "../injection";
// const usersController: UserController = Container.resolve("userController");

const router = new Router({
  prefix: "/users",
});

export { router };
