import jwt from 'jsonwebtoken';
import { config } from '../config/config';
import { ITokenPair, IUserPayload, IToken } from '../interfaces';
import { tokenRepository } from '../repositories/tokenRepository';

class TokenService {
    async generateTokenPair(payload: IUserPayload):Promise<ITokenPair> {
        const accessToken = jwt.sign(
            payload,
            config.SECRET_ACCESS_KEY!,
            { expiresIn: config.EXPIRES_IN_ACCESS },
        );
        const refreshToken = jwt.sign(
            payload,
            config.SECRET_REFRESH_KEY!,
            { expiresIn: config.EXPIRES_IN_REFRESH },
        );
        return {
            accessToken,
            refreshToken,
        };
    }

    async saveToken(userId: number, refreshToken: string, accessToken: string):
        Promise<IToken> {
        const tokenFromDb = await tokenRepository.findTokenByUserId(userId);
        if (tokenFromDb) {
            tokenFromDb.refreshToken = refreshToken;
            tokenFromDb.accessToken = accessToken;
            return tokenRepository.createToken(tokenFromDb);
        }
        return tokenRepository.createToken({ refreshToken, accessToken, userId });
    }

    async deleteUserTokenPair(userId: number) {
        return tokenRepository.deleteByParams({ userId });
    }

    async deleteTokenPairByParams(searchObject: Partial<IToken>) {
        return tokenRepository.deleteByParams(searchObject);
    }

    // async verifyToken(authToken: string, tokenType = 'access'): Promise<IUserPayload> {
    //     let secretWord = config.SECRET_ACCESS_KEY;
    //     if (tokenType === 'refresh') {
    //         secretWord = config.SECRET_REFRESH_KEY;
    //     }
    //     return jwt.verify(authToken, secretWord);
    // }
}

export const tokenService = new TokenService();
