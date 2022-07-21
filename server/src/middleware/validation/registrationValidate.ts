import { NextFunction, Request, Response } from 'express';
import { ErrorHandler } from '../../error/errorHandler';
import { validators } from '../../validators/validators';

class RegistrationValidate {
    registration(req: Request, res: Response, next: NextFunction) {
        try {
            const { error } = validators.registration.validate(req.body);
            if (error) {
                next(new ErrorHandler(error.message, 400));
            }
            next();
        } catch (e) {
            next(e);
        }
    }
}

export const registrationValidate = new RegistrationValidate();
