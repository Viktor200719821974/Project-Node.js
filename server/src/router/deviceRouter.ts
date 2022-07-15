import { Router } from 'express';
import { deviceController } from '../controllers/deviceController';
import { authMiddleware } from '../middleware/authMiddleware';
import { deviceValidate } from '../middleware/validation/deviceValidate';
import { deviceInfoValidate } from '../middleware/validation/deviceInfoValidate';

const router = Router();

router.get('/', deviceController.getAll);
router.get('/:id', deviceController.getOne);
router.post('/', authMiddleware.checkAccessToken, authMiddleware.userStaff, deviceValidate.device, deviceController.create);
router.patch('/:id', authMiddleware.checkAccessToken, authMiddleware.userStaff, deviceValidate.device, deviceController.updateDevice);
router.delete('/:id', authMiddleware.checkAccessToken, authMiddleware.userStaff, deviceController.deleteDevice);
router.post('/info/:id', authMiddleware.checkAccessToken, authMiddleware.userStaff, deviceInfoValidate.deviceInfo, deviceController.addInfoDevice);
router.patch('/info/:id', authMiddleware.checkAccessToken, authMiddleware.userStaff, deviceInfoValidate.deviceInfo, deviceController.changeDeviceInfo);
router.delete('/info/:id', authMiddleware.checkAccessToken, authMiddleware.userStaff, deviceController.deleteDeviceInfo);

export const deviceRouter = router;
