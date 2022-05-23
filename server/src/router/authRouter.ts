import { Router } from 'express';
import { authController } from '../controllers/authController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

router.post('/registration', authController.registration);
router.post('/login', authMiddleware.findUser, authMiddleware.updatedToken, authController.login);
router.post('/logout', authMiddleware.checkAccessToken, authController.logout);
router.post('/refresh', authMiddleware.checkRefreshToken, authController.refreshToken);

export const authRouter = router;
