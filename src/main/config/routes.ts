import { Express, Router } from 'express';
import FastGlob from 'fast-glob';

export default (app: Express): void => {
  const router = Router();
  app.use('/api', router);
  FastGlob.sync('**/src/main/routes/**Routes.ts').map(async file => {
    const route = (await import(`../../../${file}`)).default;
    route(router);
  });
};
