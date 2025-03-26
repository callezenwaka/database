// alpha-server/src/routes/user.route.ts
import { Router } from 'express';
import { UserController } from '../controllers';

const router = Router();

const userController = new UserController();

// All routes
router.get('/', userController.getAll);
router.get('/:id', userController.getById);
router.post('/', userController.create);
router.put('/:id', userController.update);
router.delete('/:id', userController.delete);

export default router;