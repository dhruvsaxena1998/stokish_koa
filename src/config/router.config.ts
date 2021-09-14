import Router from "@koa/router";
const router = new Router();

// Routes
import { userRouter } from "../api/routes";

router.use(userRouter.routes());

export { router };
