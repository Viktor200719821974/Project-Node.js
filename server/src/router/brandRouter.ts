import { Router } from 'express';
import { brandController } from '../controllers/brandController';
import { brandMiddleware } from '../middleware/brandMiddleware';

const router = Router();

router.post('/', brandController.create);
router.get('/', brandController.getAll);
router.put('/:id', brandMiddleware.findBrand, brandController.updateBrand);
router.delete('/:id', brandMiddleware.findBrand, brandController.deleteBrand);

export const brandRouter = router;
