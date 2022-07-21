import { NextFunction, Response } from 'express';
import { IRequestExtended } from '../interfaces';
import { model } from '../models/models';
import { ErrorHandler } from '../error/errorHandler';

class OrderMiddleware {
    async basketEmpty(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            // @ts-ignore
            const { id } = req.user;
            const basketId = await model.Basket.findOne({
                where: { userId: id },
            }).then((data) => data?.id);
            const basketDevice = await model.BasketDevice.findOne({ where: { basketId } });
            if (!basketDevice) {
                next(new ErrorHandler('Your basket is empty', 404));
            }
            next();
        } catch (e) {
            next(e);
        }
    }
}

export const orderMiddleware = new OrderMiddleware();
