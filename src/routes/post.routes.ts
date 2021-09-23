import Router from '@koa/router';

import { PostController } from '../controllers/post.controller';

import { Container } from '../injection';

const postController = Container.resolve('postController') as PostController;

const router = new Router({
  prefix: '/posts',
});

router.get('/', postController.findAndPaginate);

export { router };
