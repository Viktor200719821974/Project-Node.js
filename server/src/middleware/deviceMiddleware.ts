import { NextFunction, Request, Response } from 'express';
import { model } from '../models/models';
import { ErrorHandler } from '../error/errorHandler';

class DeviceMiddleware {
    async findDevice(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const findDevice = await model.Device.findOne({ where: { id } });
            if (!findDevice) {
                next(new ErrorHandler('Not found', 404));
                return;
            }
            next();
        } catch (e) {
            next(e);
        }
    }
}

export const deviceMiddleware = new DeviceMiddleware();
