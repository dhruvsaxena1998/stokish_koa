import Koa, { DefaultState, DefaultContext } from 'koa';
import bodyParser from 'koa-bodyparser';
import { Server } from 'http';
import { Connection } from 'typeorm';

import { router } from './routes';
import { logger } from './utils/instance';
import { errorHandler } from './middlewares/error-handler';
import { authenticate } from './middlewares/authorization';

export default class App {
  app: Koa<DefaultState, DefaultContext>;

  server: Server;

  connection: Connection;

  constructor() {
    this.app = new Koa();
    this.setup();
  }

  private setup() {
    this.app.use(
      bodyParser({
        enableTypes: ['json', 'form'],
      }),
    );

    // Set ctx.state.user property
    this.app.use(authenticate);

    // Centeralized Error handler
    this.app.use(errorHandler);
    this.app.use(router.routes()).use(router.allowedMethods());
  }

  run(port: number, host: string): void {
    this.server = this.app.listen(port, host, () => {
      logger.debug('Server is up and running');
      logger.debug(`To access the server, go to: http://${host}:${port}`);
    });
  }
}
