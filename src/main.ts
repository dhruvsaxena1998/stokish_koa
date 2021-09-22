/* eslint-disable import/first */

import 'reflect-metadata';
import { config } from 'dotenv';
import { env } from '@dolanites/utils';

config();

import { setupInjections } from './injection';
import { connectWithDatabase } from './config/database.config';

connectWithDatabase().then(async (db) => {
  setupInjections(db);

  const { App } = await import('./app');

  const port = env.number('SERVER_PORT') || 5000;
  const host = env.string('SERVER_HOST') || 'localhost';

  const app = new App();
  app.run(port, host);
});
