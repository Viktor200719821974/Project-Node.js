import { NextFunction } from 'express';
import { ITokenData, IUser, IUserLogin } from '../interfaces';
import { tokenService } from './tokenService';
import { model } from '../models/models';
import { ErrorHandler } from '../error/errorHandler';

class AuthService {
    async registration(createdUser: IUser): Promise<ITokenData> {
        return AuthService._getTokenData(createdUser);
    }

    static async _getTokenData(user: IUser): Promise<ITokenData> {
        const { email } = user;
        const userModel = await model.User.findOne({ where: { email } });
        // @ts-ignore
        const { id } = userModel;
        // eslint-disable-next-line max-len
        const tokenPair = await tokenService.generateTokenPairActivate({ userId: id, userEmail: email });
        // eslint-disable-next-line max-len
        await tokenService.saveTokenActivate(id, tokenPair.refreshToken, tokenPair.accessToken, tokenPair.activateToken);

        return {
            ...tokenPair,
            userId: id,
            userEmail: email,
        };
    }

    async login(email: string, next: NextFunction): Promise<IUserLogin> {
        const user = await model.User.findOne({
            attributes: {
                exclude: ['password', 'is_active', 'createdAt', 'updatedAt'],
            },
            where: {
                email,
            },
        });
        if (!user) {
            next(new ErrorHandler('Not found', 404));
        }
        // @ts-ignore
        const { id } = user;
        const { refreshToken, accessToken } = await tokenService.generateTokenPair(
            { userId: id, userEmail: email },
        );
        await tokenService.saveToken(id, refreshToken, accessToken);
        return { user, refreshToken, accessToken };
    }
}

export const authService = new AuthService();
