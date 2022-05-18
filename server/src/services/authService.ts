import { ITokenData, IUser } from '../interfaces';
import { tokenService } from './tokenService';

class AuthService {
    async registration(createdUser: IUser): Promise<ITokenData> {
        return AuthService._getTokenData(createdUser);
    }

    static async _getTokenData(user: IUser): Promise<ITokenData> {
        const { id, email } = user;
        const tokenPair = await tokenService.generateTokenPair({ userId: id, userEmail: email });
        await tokenService.saveToken(id, tokenPair.refreshToken, tokenPair.accessToken);

        return {
            ...tokenPair,
            userId: id,
            userEmail: email,
        };
    }
}

export const authService = new AuthService();
