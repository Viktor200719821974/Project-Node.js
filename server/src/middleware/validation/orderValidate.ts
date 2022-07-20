import { NextFunction, Response, Request } from 'express';
import { ErrorHandler } from '../../error/errorHandler';
import { validators } from '../../validators/validators';

class OrderValidate {
    order(req: Request, res: Response, next: NextFunction) {
        try {
            const { error } = validators.order.validate(req.body);
            if (error) {
                next(new ErrorHandler(error.details[0].message, 400));
            }
            next();
        } catch (e) {
            next(e);
        }
    }
}

export const orderValidate = new OrderValidate();
