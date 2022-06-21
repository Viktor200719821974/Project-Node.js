import { NextFunction, Request, Response } from 'express';
import { IRequestExtended, IUser } from '../interfaces';
import { tokenService } from '../services/tokenService';
import { userService } from '../services/userService';
import { authService } from '../services/authService';
import { constants } from '../constants';
// import { basketService } from '../services/basketService';
import { emailService } from '../services/emailService';

class AuthController {
    async registration(req:Request, res:Response, next: NextFunction): Promise<void> {
        try {
            const createdUser = await userService.createUser(req.body, next);
            const tokenData = await authService.registration(createdUser);
            const token = tokenData.activateToken;
            String(token);
            const { email, name } = createdUser;
            await emailService.sendMail(email, 'WELCOME', { userName: name }, token);
            res.json(tokenData);
        } catch (e) {
            next(e);
        }
    }

    async logout(req: IRequestExtended, res: Response): Promise<Response<string>> {
        // @ts-ignore
        const { id } = req.user;
        await tokenService.deleteUserTokenPair(Number(id));
        return res.json('Ok');
    }

    async login(req: IRequestExtended, res: Response, next: NextFunction): Promise<void> {
        try {
            const { email } = req.body;
            const tokenPair = await authService.login(email, next);
            res.json(tokenPair);
        } catch (e) {
            next(e);
        }
    }

    async refreshToken(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const { id, email } = req.user as IUser;
            const refreshTokenToDelete = req.get(constants.AUTHORIZATION);
            await tokenService.deleteTokenPairByParams(refreshTokenToDelete);

            const { accessToken, refreshToken } = await tokenService.generateTokenPair(
                { userId: id, userEmail: email },
            );

            await tokenService.saveToken(id, refreshToken, accessToken);

            res.json({
                refreshToken,
                accessToken,
                user: req.user,
            });
        } catch (e) {
            next(e);
        }
    }
}
export const authController = new AuthController();
