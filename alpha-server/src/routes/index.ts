// alpha-server/src/routes/index.ts
import { Router } from 'express';
import userRoutes from './user.route';

const router = Router();

router.use('/users', userRoutes);

export const routes = router;