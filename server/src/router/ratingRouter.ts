import { Router } from 'express';
import { ratingController } from '../controllers/ratingController';
import { authMiddleware } from '../middleware/authMiddleware';
import { ratingValidate } from '../middleware/validation/ratingValidate';

const router = Router();

router.get('/:deviceId', ratingController.getRatingDeviceId);
router.post('/', authMiddleware.checkAccessToken, ratingValidate.rating, ratingController.createRatingDevice);
router.patch('/:id', authMiddleware.checkAccessToken, authMiddleware.userStaff, ratingController.updateRatingDevice);
router.delete('/:id', authMiddleware.checkAccessToken, authMiddleware.userStaff, ratingController.deleteRatingDevice);

export const ratingRouter = router;
