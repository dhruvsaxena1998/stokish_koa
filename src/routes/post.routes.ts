import Router from '@koa/router';
import { UserRole } from '../@types/user.types';

import { PostController } from '../controllers/post.controller';

import { Container } from '../injection';
import { authorize } from '../middlewares/authorization';
import { validate } from '../middlewares/validate';
import { createPostValidator } from '../middlewares/validators/post.validator';

const postController = Container.resolve('postController') as PostController;

const router = new Router({
  prefix: '/posts',
});

router.get('/', postController.findAndPaginate);

router.post(
  '/',
  authorize([UserRole.admin]),
  validate(createPostValidator),
  postController.create,
);

export { router };
