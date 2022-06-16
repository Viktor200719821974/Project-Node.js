import { Router } from 'express';
import { userRouter } from './userRouter';
import { brandRouter } from './brandRouter';
import { typeRouter } from './typeRouter';
import { deviceRouter } from './deviceRouter';
import { authRouter } from './authRouter';
import { imageDeviceRouter } from './imageDeviceRouter';
import { basketRouter } from './basketRouter';
import { ratingRouter } from './ratingRouter';

const router = Router();

router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/brand', brandRouter);
router.use('/type', typeRouter);
router.use('/device', deviceRouter);
router.use('/imageDevice', imageDeviceRouter);
router.use('/basket', basketRouter);
router.use('/rating', ratingRouter);
// @ts-ignore
router.use('*', (err, req, res, next) => {
    res.status(err.status || 500)
        .json({
            message: err.message,
        });
});

export const apiRouter = router;
