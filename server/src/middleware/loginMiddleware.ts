import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { model } from '../models/models';
import { ErrorHandler } from '../error/errorHandler';

class LoginMiddleware {
    // eslint-disable-next-line consistent-return
    async findUser(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body;
            const user = await model.User.findOne({ where: { email } });
            if (!user) {
                return next(new ErrorHandler('Bad email or password'));
            }
            const userPassword = user.get('password');
            if (typeof userPassword === 'string') {
                const comparePassword = bcrypt.compareSync(password, userPassword);
                if (!comparePassword) {
                    return next(new ErrorHandler('Bad email or password'));
                }
            }
            const activeUser = user.get('is_active');
            if (!activeUser) {
                return next(new ErrorHandler('User not active'));
            }
            next();
        } catch (e) {
            next(e);
        }
    }
}
export const loginMiddleware = new LoginMiddleware();
