import { Router } from 'express';
import { userController } from '../controllers/userController';
import { userMiddleware } from '../middleware/userMiddleware';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

// router.patch(
// '/:id',
// authMiddleware.checkAccessToken,
// userMiddleware.findUser, authMiddleware.superUser, userController.updateUser);
// router.get('/auth', authMiddleware.checkAccessToken, userController.check);
router.get('/', authMiddleware.checkAccessToken, authMiddleware.userStaff, userController.getAll);
router.get('/:id', authMiddleware.checkAccessToken, userController.getOne);
router.get('/activateUser/:token', userController.activateUser);
router.patch('/userManager/:id', authMiddleware.checkAccessToken, authMiddleware.superUser, userController.userManager);
router.patch('/userIsNotManager/:id', authMiddleware.checkAccessToken, authMiddleware.superUser, userController.userIsNotManager);
router.patch('/userBlocked/:id', authMiddleware.checkAccessToken, authMiddleware.userStaff, userController.userBlocked);
router.patch('/userUnlocked/:id', authMiddleware.checkAccessToken, authMiddleware.userStaff, userController.userUnlocked);
router.delete('/:id', authMiddleware.checkAccessToken, userMiddleware.findUser, authMiddleware.superUser, userController.deleteUser);

export const userRouter = router;
