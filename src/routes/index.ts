import Router from '@koa/router';

// Routes
import { router as AuthRouter } from './auth.routes';
import { router as UserRouter } from './user.routes';

const router = new Router();

router.use(AuthRouter.routes());
router.use(UserRouter.routes());

export { router };
