import { Router } from 'express';
import { typeController } from '../controllers/typeController';
import { typeMiddleware } from '../middleware/typeMiddleware';
import { authMiddleware } from '../middleware/authMiddleware';
// import { validators } from '../middleware/validation/validator';

const router = Router();

router.post('/', authMiddleware.checkAccessToken, authMiddleware.userStaff, typeController.createType);
router.get('/', typeController.getAll);
router.put('/:id', authMiddleware.checkAccessToken, authMiddleware.userStaff, typeMiddleware.findType, typeController.updateType);
router.delete('/:id', authMiddleware.checkAccessToken, authMiddleware.userStaff, typeMiddleware.findType, typeController.deleteType);

export const typeRouter = router;
