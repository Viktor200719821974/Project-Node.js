import jwt from 'jsonwebtoken';
import { config } from '../config/config';
import {
    IToken,
    ITokenDataToSaveActivate, ITokenPair, ITokenPairActivate, IUserPayload,
} from '../interfaces';
import { model } from '../models/models';

class TokenService {
    async generateTokenPairActivate(payload: IUserPayload):Promise<ITokenPairActivate> {
        const accessToken = jwt.sign(
            payload,
            config.SECRET_ACCESS_KEY!,
            { expiresIn: '1h' },
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
            { expiresIn: '10m' },
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

    async saveTokenActivate(userId: number, activateToken: string)
        : Promise<ITokenDataToSaveActivate> {
        // @ts-ignore
        return model.TokenActivate.create({ activateToken, userId });
    }

    async saveToken(userId: number, refreshToken: string, accessToken: string)
        : Promise<IToken> {
        // @ts-ignore
        return model.Token.create({ refreshToken, accessToken, userId });
    }

    async deleteUserTokenPair(userId: number) {
        return model.Token.destroy({ where: { userId } });
    }

    async deleteTokenPairByParams(refreshToken: string | undefined) {
        return model.Token.findOne({ where: { refreshToken } });
    }

    async verifyToken(authToken: string, tokenType = 'accessToken'): Promise<IUserPayload> {
        let secretWord = config.SECRET_ACCESS_KEY;
        if (tokenType === 'refreshToken') {
            secretWord = config.SECRET_REFRESH_KEY;
        }
        // @ts-ignore
        return jwt.verify(authToken, secretWord);
    }

    async findByParamsAccess(accessToken: string) {
        return model.Token.findOne({ where: { accessToken } });
    }

    async findByParamsRefresh(refreshToken: string) {
        return model.Token.findOne({ where: { refreshToken } });
    }
}

export const tokenService = new TokenService();
