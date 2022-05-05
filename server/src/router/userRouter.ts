import { Router } from 'express';
import { userController } from '../controllers/userController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

router.post('/registration', userController.registration);
router.post('/login', userController.login);
router.get('/auth', authMiddleware.checkAccessToken, userController.check);

export const userRouter = router;
