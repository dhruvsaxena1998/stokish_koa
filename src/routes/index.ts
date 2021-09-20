import Router from "@koa/router";
const router = new Router();

// Routes
import { router as AuthRouter } from "./auth.routes";
import { router as UserRouter } from "./user.routes";

router.use(AuthRouter.routes());
router.use(UserRouter.routes());

export { router };
