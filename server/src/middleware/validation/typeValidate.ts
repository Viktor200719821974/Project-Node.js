import { NextFunction, Response } from 'express';
import { IRequestExtended } from '../../interfaces';
import { ErrorHandler } from '../../error/errorHandler';
import { validators } from '../../validators/validators';

class TypeValidate {
    type(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const { error } = validators.type.validate(req.body);
            if (error) {
                next(new ErrorHandler(error.details[0].message, 400));
            }
            next();
        } catch (e) {
            next(e);
        }
    }
}

export const typeValidate = new TypeValidate();
