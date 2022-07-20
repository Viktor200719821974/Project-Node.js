import { Router } from 'express';
import { authMiddleware } from '../middleware/authMiddleware';
import { orderController } from '../controllers/orderController';
import { orderValidate } from '../middleware/validation/orderValidate';

const router = Router();

router.post('/', authMiddleware.checkAccessToken, orderValidate.order, orderController.createOrder);
router.get('/:id', authMiddleware.checkAccessToken, authMiddleware.userStaff, orderController.getOrderId);

export const orderRouter = router;
