import { Router } from 'express';
import { deviceController } from '../controllers/deviceController';

const router = Router();

router.post('/', deviceController.create);
router.get('/', deviceController.getAll);
router.get('/:id', deviceController.getOne);

export const deviceRouter = router;
