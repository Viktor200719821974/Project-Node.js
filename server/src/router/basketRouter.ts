import { Router } from 'express';
import { authMiddleware } from '../middleware/authMiddleware';
import { basketController } from '../controllers/basketController';

const router = Router();

router.post('/:deviceId', authMiddleware.checkAccessToken, basketController.createBasketDevice);
router.get('/', authMiddleware.checkAccessToken, basketController.getBasketDevice);
router.delete('/:deviceId', authMiddleware.checkAccessToken, basketController.deleteDeviceFromBasket);

export const basketRouter = router;
