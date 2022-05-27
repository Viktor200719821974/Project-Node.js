import { Router } from 'express';
import { deviceController } from '../controllers/deviceController';
import { deviceMiddleware } from '../middleware/deviceMiddleware';

const router = Router();

router.post('/', deviceController.create);
router.post('/addImage/:id', deviceMiddleware.findDevice, deviceController.createImage);
router.get('/', deviceController.getAll);
router.get('/getImage/:id', deviceController.getOneImage);
router.get('/:id', deviceController.getOne);

export const deviceRouter = router;
