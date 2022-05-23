import { Router } from 'express';
import { userController } from '../controllers/userController';
import { authMiddleware } from '../middleware/authMiddleware';
import { userMiddleware } from '../middleware/userMiddleware';
import { authController } from '../controllers/authController';
import { loginMiddleware } from '../middleware/loginMiddleware';

const router = Router();

router.post('/registration', userController.createUser);
// router.post('/login', userController.login);
router.post('/auth/login', loginMiddleware.findUser, authController.login);
router.get('/auth', authMiddleware.checkAccessToken, userController.check);
router.get('/', userController.getAll);
router.get('/:id', userController.getOne);
router.patch('/:id', userMiddleware.findUser, userController.updateUser);
router.delete('/:id', userMiddleware.findUser, userController.deleteUser);

export const userRouter = router;
