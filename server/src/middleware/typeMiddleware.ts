import { NextFunction, Request, Response } from 'express';
import { model } from '../models/models';
import { ErrorHandler } from '../error/errorHandler';

class TypeMiddleware {
    async findType(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const findType = await model.Type.findOne({ where: { id } });
            if (!findType) {
                next(new ErrorHandler('Not found', 404));
                return;
            }
            next();
        } catch (e) {
            next(e);
        }
    }
}

export const typeMiddleware = new TypeMiddleware();
