import { Router } from 'express';

import devRoutes from '@modules/dev/infra/http/routes';
import adminRoutes from '@modules/admin/infra/http/routes';

const router = Router();

router.use('/dev', devRoutes);
router.use('/admin', adminRoutes);

router.get(`/health`, (_, res) => {
  const healthData = { status: 'online' };

  return res.json(healthData).status(200);
});

export default router;
