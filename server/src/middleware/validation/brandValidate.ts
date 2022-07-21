import { NextFunction, Request, Response } from 'express';
import { validators } from '../../validators/validators';
import { ErrorHandler } from '../../error/errorHandler';

class BrandValidate {
    brand(req: Request, res: Response, next: NextFunction) {
        try {
            const { error } = validators.brand.validate(req.body);
            if (error) {
                next(new ErrorHandler(error.message, 400));
            }
            next();
        } catch (e) {
            next(e);
        }
    }
}

export const brandValidate = new BrandValidate();
