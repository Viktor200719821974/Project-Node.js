import { Router } from 'express';
import { deviceController } from '../controllers/deviceController';
import { authMiddleware } from '../middleware/authMiddleware';
import { deviceValidate } from '../middleware/validation/deviceValidate';

const router = Router();

router.get('/', deviceController.getAll);
router.get('/:id', deviceController.getOne);
router.post('/', authMiddleware.checkAccessToken, authMiddleware.userStaff, deviceValidate.device, deviceController.create);
router.patch('/:id', authMiddleware.checkAccessToken, authMiddleware.userStaff, deviceValidate.device, deviceController.updateDevice);
router.delete('/:id', authMiddleware.checkAccessToken, authMiddleware.userStaff, deviceController.deleteDevice);

export const deviceRouter = router;
