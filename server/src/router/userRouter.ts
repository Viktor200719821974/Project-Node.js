import { Router } from 'express';
import { userController } from '../controllers/userController';
import { userMiddleware } from '../middleware/userMiddleware';

const router = Router();

// router.post('/login', userController.login);
// router.get('/auth', authMiddleware.checkAccessToken, userController.check);
router.get('/', userController.getAll);
router.get('/:id', userController.getOne);
router.patch('/:id', userMiddleware.findUser, userController.updateUser);
router.delete('/:id', userMiddleware.findUser, userController.deleteUser);

export const userRouter = router;
