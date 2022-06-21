import { Router } from 'express';
import { ratingController } from '../controllers/ratingController';
import { authMiddleware } from '../middleware/authMiddleware';
// import { validators } from '../middleware/validation/validator';

const router = Router();

router.get('/:deviceId', ratingController.getRatingDeviceId);
router.post('/', authMiddleware.checkAccessToken, ratingController.createRatingDevice);

export const ratingRouter = router;
