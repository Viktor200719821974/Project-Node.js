import { Router } from 'express';

const router = Router();

router.post('/');
router.get('/');
router.get('/:id');

export const deviceRouter = router;
