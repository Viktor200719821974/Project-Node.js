import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { ErrorHandler } from '../error/errorHandler';
import { config } from '../config/config';

class AuthMiddleware {
    // eslint-disable-next-line consistent-return
    public checkAccessToken(req: Request, res: Response, next: NextFunction) {
        if (req.method === 'OPTIONS') {
            next();
        }
        try {
            const secretKey = String(config.SECRET_ACCESS_KEY);
            const token = req.headers.authorization?.split(' ')[1];
            if (!token) {
                return next(new ErrorHandler('Unauthorized', 401));
            }
            const decoded = jwt.verify(token, secretKey);
            console.log(decoded);
            next();
        } catch (e) {
            next(e);
        }
    }
}

export const authMiddleware = new AuthMiddleware();
