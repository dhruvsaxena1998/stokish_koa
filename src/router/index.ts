import Router from "@koa/router";

import { userRoutes } from "./user.routes";

const router = new Router({
  prefix: "/api",
});

router.use(userRoutes.routes());

export { router };
