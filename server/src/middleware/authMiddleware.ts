import { NextFunction, Response } from 'express';
import bcrypt from 'bcrypt';
import { ErrorHandler } from '../error/errorHandler';
import { IRequestExtended } from '../interfaces';
import { model } from '../models/models';
import { tokenService } from '../services/tokenService';
import { userService } from '../services/userService';

class AuthMiddleware {
    async checkAccessToken(req: IRequestExtended, res: Response, next: NextFunction) {
        if (req.method === 'OPTIONS') {
            next();
        }
        try {
            const token = req.headers.authorization?.split(' ')[1];
            if (!token) {
                next(new ErrorHandler('No token', 404));
                return;
            }
            const { userEmail } = await tokenService.verifyToken(token);
            if (userEmail) {
                next(new ErrorHandler('Unauthorized', 401));
            }
            await tokenService.findByParamsAccess(token);
            // @ts-ignore
            req.user = await userService.getUserByEmail(userEmail);
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
            next();
        } catch (e) {
            next(e);
        }
    }

    // async updatedToken(req: Request, res: Response, next: NextFunction) {
    //     try {
    //         const { email } = req.body;
    //         const user = await model.User.findOne({ where: { email } });
    //         if (!user) {
    //             next(new ErrorHandler('Not found'));
    //         }
    //         // @ts-ignore
    //         const userId = user.get('id');
    //         const token = await model.Token.findAll({ where: { userId } });
    //         if (token) {
    //             await model.Token.destroy({ where: { userId } });
    //         }
    //         next();
    //     } catch (e) {
    //         next(e);
    //     }
    // }

    async checkRefreshToken(req: IRequestExtended, res: Response, next: NextFunction) {
        if (req.method === 'OPTIONS') {
            next();
        }
        try {
            const token = req.headers.authorization;
            if (!token) {
                next(new ErrorHandler('Unauthorized', 401));
                return;
            }
            const { userEmail } = await tokenService.verifyToken(token, 'refreshToken');
            await tokenService.findByParamsRefresh(token);
            // @ts-ignore
            req.user = await userService.getUserByEmail(userEmail);
            next();
        } catch (e: any) {
            next(e);
        }
    }

    async userStaff(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const { user } = req;
            if (!user?.is_superuser && !user?.is_staff) {
                next(new ErrorHandler('Forbidden', 403));
            }
            next();
        } catch (e) {
            next(e);
        }
    }
}

export const authMiddleware = new AuthMiddleware();
