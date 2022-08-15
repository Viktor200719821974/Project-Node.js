import { Router } from 'express';
import { brandsController } from '../controllers/brandController';
import { brandMiddleware } from '../middleware/brandMiddleware';
import { authMiddleware } from '../middleware/authMiddleware';
import { brandValidate } from '../middleware/validation/brandValidate';

const router = Router();

router.post('/', authMiddleware.checkAccessToken, authMiddleware.userStaff, brandValidate.brand, brandsController.create);
router.get('/', brandsController.getAll);
router.put('/:id', authMiddleware.checkAccessToken, authMiddleware.userStaff, brandMiddleware.findBrand, brandValidate.brand, brandsController.updateBrand);
router.delete('/:id', authMiddleware.checkAccessToken, authMiddleware.userStaff, brandMiddleware.findBrand, brandsController.deleteBrand);

export const brandRouter = router;
