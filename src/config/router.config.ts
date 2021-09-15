import Router from "@koa/router";
const router = new Router();

// Routes
import { authRouter, userRouter } from "../api/routes";

router.use(authRouter.routes());
router.use(userRouter.routes());

export { router };
