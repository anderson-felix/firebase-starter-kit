import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import { joiCustomValidations } from '@shared/utils';
import AdminController from '../controllers/AdminController';

const adminRouter = Router();

adminRouter.post(
  '/create',
  celebrate({
    [Segments.BODY]: {
      name: joiCustomValidations.name().required(),
      email: Joi.string().email().required(),
      password: joiCustomValidations.password().required(),
    },
  }),
  AdminController.create,
);

export default adminRouter;
