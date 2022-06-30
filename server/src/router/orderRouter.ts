import { Router } from 'express';
import { authMiddleware } from '../middleware/authMiddleware';
import { orderController } from '../controllers/orderController';

const router = Router();

router.post('/', authMiddleware.checkAccessToken, orderController.createOrder);

export const orderRouter = router;
