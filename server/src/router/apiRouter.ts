import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import docs from '../docs/swagger.json';
import { userRouter } from './userRouter';
import { brandRouter } from './brandRouter';
import { typeRouter } from './typeRouter';
import { deviceRouter } from './deviceRouter';
import { authRouter } from './authRouter';
import { imageDeviceRouter } from './imageDeviceRouter';
import { basketRouter } from './basketRouter';
import { ratingRouter } from './ratingRouter';
import { orderRouter } from './orderRouter';

const router = Router();

router.use('/docs', swaggerUi.serve, swaggerUi.setup(docs));
router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/brands', brandRouter);
router.use('/types', typeRouter);
router.use('/devices', deviceRouter);
router.use('/imageDevice', imageDeviceRouter);
router.use('/basket', basketRouter);
router.use('/rating', ratingRouter);
router.use('/order', orderRouter);
// @ts-ignore
router.use('*', (err, req, res, next) => {
    res.status(err.status || 500)
        .json({
            message: err.message,
        });
});
// router.use('*', (req, res, next) => {
// // update to match the domain you will make the request from
//     res.header("Access-Control-Allow-Origin", "YOUR-DOMAIN.TLD");
//     res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,PATCH");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });

export const apiRouter = router;
