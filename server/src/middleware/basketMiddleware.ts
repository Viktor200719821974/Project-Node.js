import { NextFunction, Response } from 'express';
import { IRequestExtended } from '../interfaces';
import { model } from '../models/models';
import { ErrorHandler } from '../error/errorHandler';

class BasketMiddleware {
    async findBasketDevice(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            // @ts-ignore
            const { id } = req.user;
            const { deviceId } = req.params;
            const basket = await model.Basket.findOne({ where: { userId: id } });
            if (!basket) {
                next(new ErrorHandler('Basket not found', 404));
            }
            const basketId = basket?.id;
            Number(basketId);
            const findDevice = await model.BasketDevice.findOne({ where: { deviceId, basketId } });
            if (findDevice) {
                next(new ErrorHandler('The device is already in the basket', 404));
            }
            next();
        } catch (e) {
            next(e);
        }
    }
}

export const basketMiddleware = new BasketMiddleware();
