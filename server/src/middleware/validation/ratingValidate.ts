import { NextFunction, Response } from 'express';
import { validators } from '../../validators/validators';
import { IRequestExtended } from '../../interfaces';
import { ErrorHandler } from '../../error/errorHandler';

class RatingValidate {
    rating(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const { error } = validators.rating.validate(req.body);
            if (error) {
                next(new ErrorHandler(error.details[0].message, 400));
            }
            next();
        } catch (e) {
            next(e);
        }
    }
}

export const ratingValidate = new RatingValidate();
