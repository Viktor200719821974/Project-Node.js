import { NextFunction, Request, Response } from 'express';
import { model } from '../models/models';
import { ErrorHandler } from '../error/errorHandler';

class UserMiddleware {
    async findUser(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const findUser = await model.User.findOne({ where: { id } });
            if (!findUser) {
                next(new ErrorHandler('Not found', 404));
                return;
            }
            next();
        } catch (e) {
            next(e);
        }
    }
}

export const userMiddleware = new UserMiddleware();
