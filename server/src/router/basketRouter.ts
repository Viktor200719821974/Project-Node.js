import { Router } from 'express';
import { authMiddleware } from '../middleware/authMiddleware';
import { basketController } from '../controllers/basketController';
import { basketMiddleware } from '../middleware/basketMiddleware';

const router = Router();

router.get('/', authMiddleware.checkAccessToken, basketController.getBasketDevice);
router.post('/:deviceId', authMiddleware.checkAccessToken, basketMiddleware.findBasketDevice, basketController.createBasketDevice);
router.patch('/:deviceId', authMiddleware.checkAccessToken, basketController.updateAmountDeviceBasket);
router.delete('/:deviceId', authMiddleware.checkAccessToken, basketController.deleteDeviceFromBasket);

export const basketRouter = router;
