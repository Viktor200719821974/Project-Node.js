import { Router } from 'express';
import { typeController } from '../controllers/typeController';
import { typeMiddleware } from '../middleware/typeMiddleware';
import { authMiddleware } from '../middleware/authMiddleware';
import { typeValidate } from '../middleware/validation/typeValidate';

const router = Router();

router.post('/', authMiddleware.checkAccessToken, authMiddleware.userStaff, typeValidate.type, typeController.createType);
router.get('/', typeController.getAll);
router.put('/:id', authMiddleware.checkAccessToken, authMiddleware.userStaff, typeMiddleware.findType, typeValidate.type, typeController.updateType);
router.delete('/:id', authMiddleware.checkAccessToken, authMiddleware.userStaff, typeMiddleware.findType, typeController.deleteType);

export const typeRouter = router;
