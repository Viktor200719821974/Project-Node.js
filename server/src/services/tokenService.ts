import jwt from 'jsonwebtoken';
import { config } from '../config/config';
import { ITokenPair, ITokenPairActivate, IUserPayload } from '../interfaces';
import { model } from '../models/models';

class TokenService {
    async generateTokenPairActivate(payload: IUserPayload):Promise<ITokenPairActivate> {
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
        const activateToken = jwt.sign(
            payload,
            config.SECRET_ACTIVATE_KEY!,
            { expiresIn: '48h' },
        );
        return {
            accessToken,
            refreshToken,
            activateToken,
        };
    }

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

    // eslint-disable-next-line max-len
    async saveTokenActivate(userId: number, refreshToken: string, accessToken: string, activateToken: string) {
        // @ts-ignore
        return model.Token.create({
            refreshToken, accessToken, activateToken, userId,
        });
    }

    // eslint-disable-next-line max-len
    async saveToken(userId: number, refreshToken: string, accessToken: string) {
        return model.Token.update({
            refreshToken, accessToken,
        }, { where: { userId } });
    }

    async deleteUserTokenPair(userId: number) {
        return model.Token.update({ accessToken: 'null', refreshToken: 'null' }, { where: { userId } });
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
