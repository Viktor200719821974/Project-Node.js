import { NextFunction, Response } from 'express';
import { IRequestExtended } from '../../interfaces';
import { ErrorHandler } from '../../error/errorHandler';
import {
    // brandValidator,
    // deviceValidator,
    // ratingValidator,
    registrationValidator,
    // typeValidator,
} from '../../validators/validator';

class Validator {
    registration(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const { error } = registrationValidator.registration.validate(req.body);
            if (error) {
                next(new ErrorHandler(error.details[0].message, 400));
            }
            next();
        } catch (e) {
            next(e);
        }
    }

    // device(req: IRequestExtended, res: Response, next: NextFunction) {
    //     try {
    //         const { error } = deviceValidator.device.validate(req.body);
    //         if (error) {
    //             next(new ErrorHandler(error.details[0].message, 400));
    //         }
    //         next();
    //     } catch (e) {
    //         next(e);
    //     }
    // }
    //
    // type(req: IRequestExtended, res: Response, next: NextFunction) {
    //     try {
    //         const { error } = typeValidator.type.validate(req.body);
    //         if (error) {
    //             next(new ErrorHandler(error.details[0].message, 400));
    //         }
    //         next();
    //     } catch (e) {
    //         next(e);
    //     }
    // }
    //
    // brand(req: IRequestExtended, res: Response, next: NextFunction) {
    //     try {
    //         const { error } = brandValidator.brand.validate(req.body);
    //         if (error) {
    //             next(new ErrorHandler(error.details[0].message, 400));
    //         }
    //         next();
    //     } catch (e) {
    //         next(e);
    //     }
    // }
    //
    // rating(req: IRequestExtended, res: Response, next: NextFunction) {
    //     try {
    //         const { error } = ratingValidator.rating.validate(req.body);
    //         if (error) {
    //             next(new ErrorHandler(error.details[0].message, 400));
    //         }
    //         next();
    //     } catch (e) {
    //         next(e);
    //     }
    // }
}

export const validators = new Validator();
