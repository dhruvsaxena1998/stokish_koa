import Router from '@koa/router';

import { AuthController } from '../controllers/auth.controller';

import { validate } from '../middlewares/validate';
import {
  registerViaEmailValidator,
  loginViaIdentifierValidator,
  connectViaMagicLinkValidator,
} from '../middlewares/validators/auth.validator';

import { Container } from '../injection';

const authController = Container.resolve('authController') as AuthController;

const router = new Router({
  prefix: '/auth',
});

router.post(
  '/local/login',
  validate(loginViaIdentifierValidator),
  authController.loginViaIdentifier,
);

router.post(
  '/local/register',
  validate(registerViaEmailValidator),
  authController.registerViaEmail,
);

router.post(
  '/magic',
  validate(connectViaMagicLinkValidator),
  authController.connectViaMagicLink,
);

export { router };
export default router;
