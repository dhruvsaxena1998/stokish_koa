import Router from '@koa/router';
import { UserRole } from '../@types/user.types';

import { PostController } from '../controllers/post.controller';

import { Container } from '../injection';
import { authorize } from '../middlewares/authorization';

const postController = Container.resolve('postController') as PostController;

const router = new Router({
  prefix: '/posts',
});

// ! Example for role based authorization
router.get('/', authorize([UserRole.admin]), postController.findAndPaginate);

export { router };
