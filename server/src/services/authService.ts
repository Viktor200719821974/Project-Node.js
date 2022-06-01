import { ITokenData, IUser } from '../interfaces';
import { tokenService } from './tokenService';
import { model } from '../models/models';

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
}

export const authService = new AuthService();
