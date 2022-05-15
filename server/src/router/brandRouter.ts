import { Router } from 'express';
import { brandController } from '../controllers/brandController';

const router = Router();

router.post('/', brandController.create);
router.get('/', brandController.getAll);
router.put('/:id', brandController.updateBrand);

export const brandRouter = router;
