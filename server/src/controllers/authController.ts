import { NextFunction, Request, Response } from 'express';
import { model } from '../models/models';
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
    async login(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { email } = req.body;
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
