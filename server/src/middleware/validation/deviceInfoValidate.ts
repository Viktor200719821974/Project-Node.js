import { NextFunction, Request, Response } from 'express';
import { validators } from '../../validators/validators';
import { ErrorHandler } from '../../error/errorHandler';

class DeviceInfoValidate {
    deviceInfo(req: Request, res: Response, next: NextFunction) {
        try {
            const { error } = validators.deviceInfo.validate(req.body);
            if (error) {
                next(new ErrorHandler(error.message, 400));
            }
            next();
        } catch (e) {
            next(e);
        }
    }
}

export const deviceInfoValidate = new DeviceInfoValidate();
