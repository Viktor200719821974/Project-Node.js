import jwt from 'jsonwebtoken';
import { config } from '../config/config';
import { ITokenPair, IUserPayload } from '../interfaces';
import { model } from '../models/models';

class TokenService {
    async generateTokenPair(payload: IUserPayload):Promise<ITokenPair> {
        const accessToken = jwt.sign(
            payload,
            config.SECRET_ACCESS_KEY!,
            { expiresIn: '24h' },
        );
        const refreshToken = jwt.sign(
            payload,
            config.SECRET_REFRESH_KEY!,
            { expiresIn: '24h' },
        );
        return {
            accessToken,
            refreshToken,
        };
    }

    async saveToken(userId: number, refreshToken: string, accessToken: string) {
        return model.Token.create({ refreshToken, accessToken, userId });
    }

    // async deleteUserTokenPair(userId: number) {
    //     return tokenRepository.deleteByParams({ userId });
    // }
    //
    // async deleteTokenPairByParams(searchObject: Partial<IToken>) {
    //     return tokenRepository.deleteByParams(searchObject);
    // }

    // async verifyToken(authToken: string, tokenType = 'access'): Promise<IUserPayload> {
    //     let secretWord = config.SECRET_ACCESS_KEY;
    //     if (tokenType === 'refresh') {
    //         secretWord = config.SECRET_REFRESH_KEY;
    //     }
    //     return jwt.verify(authToken, secretWord);
    // }
}

export const tokenService = new TokenService();
