import { Router } from 'express';

import adminRouter from './admin.routes';

const routes = Router();

routes.use(adminRouter);

export default routes;
