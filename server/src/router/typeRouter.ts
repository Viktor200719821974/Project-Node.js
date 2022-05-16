import { Router } from 'express';
import { typeController } from '../controllers/typeController';
import { typeMiddleware } from '../middleware/typeMiddleware';

const router = Router();

router.post('/', typeController.createType);
router.get('/', typeController.getAll);
router.put('/:id', typeMiddleware.findType, typeController.updateType);
router.delete('/:id', typeMiddleware.findType, typeController.deleteType);

export const typeRouter = router;
