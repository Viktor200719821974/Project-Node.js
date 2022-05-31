import { Router } from 'express';
import { deviceMiddleware } from '../middleware/deviceMiddleware';
import { imageDeviceController } from '../controllers/imageDeviceController';

const router = Router();
router.get('/:id', imageDeviceController.getOneImage);
router.post('/addImage/:id', deviceMiddleware.findDevice, imageDeviceController.createImage);
router.post('/addImageAws/:id', deviceMiddleware.findDevice, imageDeviceController.createImageAws);

export const imageDeviceRouter = router;
