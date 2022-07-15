import { NextFunction, Request, Response } from 'express';
import { validators } from '../../validators/validators';
import { ErrorHandler } from '../../error/errorHandler';

class RatingValidate {
    rating(req: Request, res: Response, next: NextFunction) {
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
