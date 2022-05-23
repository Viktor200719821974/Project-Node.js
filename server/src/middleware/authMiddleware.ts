import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { ErrorHandler } from '../error/errorHandler';
import { config } from '../config/config';
import { IRequestExtended, IUser, IUserPayload } from '../interfaces';
import { model } from '../models/models';

class AuthMiddleware {
    public checkAccessToken(req: IRequestExtended, res: Response, next: NextFunction) {
        if (req.method === 'OPTIONS') {
            next();
        }
        try {
            const secretKey = String(config.SECRET_ACCESS_KEY);
            const token = req.headers.authorization?.split(' ')[1];
            if (!token) {
                next(new ErrorHandler('Unauthorized', 401));
                return;
            }
            const decoded = jwt.verify(token, secretKey) as IUserPayload;
            // @ts-ignore
            req.user = decoded as IUserPayload;
            next();
        } catch (e) {
            next(e);
        }
    }

    async findUser(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body;
            const user = await model.User.findOne({ where: { email } });
            if (!user) {
                next(new ErrorHandler('Bad email or password'));
                return;
            }
            const userPassword = user.get('password');
            if (typeof userPassword === 'string') {
                const comparePassword = bcrypt.compareSync(password, userPassword);
                if (!comparePassword) {
                    next(new ErrorHandler('Bad email or password'));
                    return;
                }
            }
            const activeUser = user.get('is_active');
            if (!activeUser) {
                next(new ErrorHandler('User not active'));
                return;
            }
            req.user as IUser;
            next();
        } catch (e) {
            next(e);
        }
    }

    async updatedToken(req: Request, res: Response, next: NextFunction) {
        try {
            const { email } = req.body;
            const user = await model.User.findOne({ where: { email } });
            // @ts-ignore
            const userId = user.get('id');
            const token = await model.Token.findAll({ where: { userId } });
            if (token) {
                await model.Token.destroy({ where: { userId } });
            }
            next();
        } catch (e) {
            next(e);
        }
    }

    async checkRefreshToken(req: IRequestExtended, res: Response, next: NextFunction) {
        if (req.method === 'OPTIONS') {
            next();
        }
        try {
            const secretKey = String(config.SECRET_REFRESH_KEY);
            const token = req.headers.authorization;
            if (!token) {
                next(new ErrorHandler('Unauthorized', 401));
                return;
            }
            const decoded = jwt.verify(token, secretKey);
            // @ts-ignore
            req.user = decoded as IUserPayload;
            next();
        } catch (e: any) {
            next(e);
        }
    }
}

export const authMiddleware = new AuthMiddleware();
