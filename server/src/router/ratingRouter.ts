import { Router } from 'express';
import { ratingController } from '../controllers/ratingController';

const router = Router();

router.get('/:deviceId', ratingController.getRatingDeviceId);

export const ratingRouter = router;
