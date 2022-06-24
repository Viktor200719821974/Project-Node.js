import { Router } from 'express';
import { deviceController } from '../controllers/deviceController';
import { authMiddleware } from '../middleware/authMiddleware';
import { deviceValidate } from '../middleware/validation/deviceValidate';

const router = Router();

router.post('/', authMiddleware.checkAccessToken, authMiddleware.userStaff, deviceValidate.device, deviceController.create);
router.get('/', deviceController.getAll);
router.get('/:id', deviceController.getOne);
// router.get('/', deviceController.getDevicesPagination);

export const deviceRouter = router;
