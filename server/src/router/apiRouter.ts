import { Router } from 'express';
import { userRouter } from './userRouter';
import { brandRouter } from './brandRouter';
import { typeRouter } from './typeRouter';
import { deviceRouter } from './deviceRouter';

const router = Router();

router.use('/user', userRouter);
router.use('/brand', brandRouter);
router.use('/type', typeRouter);
router.use('/device', deviceRouter);
// @ts-ignore
router.use('*', (err, req, res, next) => {
    res.status(err.status || 500)
        .json({
            message: err.message,
        });
});

export const apiRouter = router;
