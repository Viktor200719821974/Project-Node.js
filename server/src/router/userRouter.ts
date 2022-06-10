import { Router } from 'express';
import { userController } from '../controllers/userController';
import { userMiddleware } from '../middleware/userMiddleware';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

router.get('/auth', authMiddleware.checkAccessToken, userController.check);
router.get('/', userController.getAll);
router.get('/:id', authMiddleware.checkAccessToken, userController.getOne);
router.get('/activateUser/:token', userController.activateUser);
router.patch('/:id', userMiddleware.findUser, userController.updateUser);
router.delete('/:id', userMiddleware.findUser, userController.deleteUser);
router.post('/userManager/:id', authMiddleware.checkAccessToken, userController.userManager);
router.post('/userIsNotManager/:id', authMiddleware.checkAccessToken, userController.userIsNotManager);
router.post('/userBlocked/:id', authMiddleware.checkAccessToken, userController.userBlocked);
router.post('/userUnlocked/:id', authMiddleware.checkAccessToken, userController.userUnlocked);

export const userRouter = router;
