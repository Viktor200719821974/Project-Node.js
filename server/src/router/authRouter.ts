import { Router } from 'express';
import { authController } from '../controllers/authController';
import { authMiddleware } from '../middleware/authMiddleware';
import { registrationValidate } from '../middleware/validation/registrationValidate';

const router = Router();

router.post('/registration', registrationValidate.registration, authController.registration);
router.post('/login', authMiddleware.findUser, authController.login);
router.post('/logout', authMiddleware.checkAccessToken, authController.logout);
router.post('/refresh', authMiddleware.checkRefreshToken, authController.refreshToken);

export const authRouter = router;
