import { Router } from 'express';
import { userController } from '../controllers/userController';
import { authMiddleware } from '../middleware/authMiddleware';
import { userMiddleware } from '../middleware/userMiddleware';

const router = Router();

router.post('/registration', userController.createUser);
router.post('/login', userController.login);
router.get('/auth', authMiddleware.checkAccessToken, userController.check);
router.delete('/:id', userMiddleware.findUser, userController.deleteUser);

export const userRouter = router;
