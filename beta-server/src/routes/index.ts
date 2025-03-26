// beta-server/src/routes/index.ts
import { Router } from 'express';
import blogRoutes from './blog.route';

const router = Router();

router.use('/blogs', blogRoutes);

export const routes = router;