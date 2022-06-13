import { Router } from 'express';
import { authMiddleware } from '../middleware/authMiddleware';
import { basketController } from '../controllers/basketController';

const router = Router();

router.post('/', authMiddleware.checkAccessToken, basketController.createBasketDevice);
router.get('/:id', basketController.getBasketDevice);

export const basketRouter = router;
