import { Router } from 'express';
import { deviceController } from '../controllers/deviceController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

router.post('/', authMiddleware.checkAccessToken, authMiddleware.userStaff, deviceController.create);
router.get('/', deviceController.getAll);
router.get('/:id', deviceController.getOne);
// router.get('/', deviceController.getDevicesPagination);

export const deviceRouter = router;
