import { NextFunction, Request, Response } from 'express';
import { model } from '../models/models';
import { ErrorHandler } from '../error/errorHandler';

class BrandMiddleware {
    async findBrand(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const findBrand = await model.Brand.findOne({ where: { id } });
            if (!findBrand) {
                next(new ErrorHandler('Not found', 404));
                return;
            }
            next();
        } catch (e) {
            next(e);
        }
    }
}

export const brandMiddleware = new BrandMiddleware();
