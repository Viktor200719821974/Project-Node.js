import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { model } from '../models/models';
import { ErrorHandler } from '../error/errorHandler';
import { IUser } from '../interfaces';
import { tokenService } from '../services/tokenService';

class AuthController {
//     // async logout(req: Request, res: Response): Promise<Response<string>> {
//     //     const { id } = req.user as IUser;
//     //
//     //     await tokenService.deleteUserTokenPair(id);
//     //     return res.json('Ok');
//     // }
//
    // eslint-disable-next-line consistent-return
    async login(req: Request, res: Response, next: NextFunction) {
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
            const userDb = await model.User.findOne({ where: { email } });
            const { id } = userDb as unknown as IUser;
            // eslint-disable-next-line max-len
            //             // await emailService.sendMail(email, EmailActionEnum.WELCOME, { userName: 'Nastya' });
            const { refreshToken, accessToken } = await tokenService.generateTokenPair(
                { userId: id, userEmail: email },
            );
            await tokenService.saveToken(id, refreshToken, accessToken);
            res.json({
                refreshToken,
                accessToken,
                userDb,
            });
        } catch (e) {
            next(e);
        }
    }
}
export const authController = new AuthController();
