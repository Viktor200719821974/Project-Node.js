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

    async deleteUserTokenPair(userId: number) {
        return model.Token.destroy({ where: { userId } });
    }

    async deleteTokenPairByParams(refreshToken: string | undefined) {
        return model.Token.findOne({ where: { refreshToken } });
    }

    async verifyToken(authToken: string, tokenType = 'access') {
        let secretWord = config.SECRET_ACCESS_KEY;
        if (tokenType === 'refresh') {
            secretWord = config.SECRET_REFRESH_KEY;
        }
        // @ts-ignore
        return jwt.verify(authToken, secretWord);
    }

    async findByParams(refreshToken: string) {
        return model.Token.findOne({ where: { refreshToken } });
    }
}

export const tokenService = new TokenService();
