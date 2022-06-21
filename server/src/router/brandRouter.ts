import { Router } from 'express';
import { brandController } from '../controllers/brandController';
import { brandMiddleware } from '../middleware/brandMiddleware';
import { authMiddleware } from '../middleware/authMiddleware';
// import { validators } from '../middleware/validation/validator';

const router = Router();

router.post('/', authMiddleware.checkAccessToken, authMiddleware.userStaff, brandController.create);
router.get('/', brandController.getAll);
router.put('/:id', authMiddleware.checkAccessToken, authMiddleware.userStaff, brandMiddleware.findBrand, brandController.updateBrand);
router.delete('/:id', authMiddleware.checkAccessToken, authMiddleware.userStaff, brandMiddleware.findBrand, brandController.deleteBrand);

export const brandRouter = router;
