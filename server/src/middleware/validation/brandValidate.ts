import { NextFunction, Response } from 'express';
import { IRequestExtended } from '../../interfaces';
import { validators } from '../../validators/validators';
import { ErrorHandler } from '../../error/errorHandler';

class BrandValidate {
    brand(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const { error } = validators.brand.validate(req.body);
            if (error) {
                next(new ErrorHandler(error.details[0].message, 400));
            }
            next();
        } catch (e) {
            next(e);
        }
    }
}

export const brandValidate = new BrandValidate();
