import { Router } from 'express';
import { deviceMiddleware } from '../middleware/deviceMiddleware';
import { imageDeviceController } from '../controllers/imageDeviceController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();
router.get('/', imageDeviceController.getAllImage);
router.get('/:id', imageDeviceController.getOneImage);
// router.post('/addImage/:id', deviceMiddleware.findDevice, imageDeviceController.createImage);
router.post('/addImageAws/:id', authMiddleware.checkAccessToken, authMiddleware.userStaff, deviceMiddleware.findDevice, imageDeviceController.createImageAws);

export const imageDeviceRouter = router;
