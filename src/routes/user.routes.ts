import Router from '@koa/router';
import { UserController } from '../controllers/users.controller';

import { Container } from '../injection';

const usersController: UserController = Container.resolve('userController');

const router = new Router({
  prefix: '/users',
});

router.get('/me', usersController.me);

export { router };
export default router;
