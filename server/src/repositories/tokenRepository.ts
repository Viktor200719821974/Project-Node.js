import { IToken, ITokenDataToSave } from '../interfaces';

class TokenRepository {
    // @ts-ignore
    async createToken(token: ITokenDataToSave): Promise<IToken> {

    }

    // @ts-ignore
    public findByParams(filterObject: Partial<IToken>): Promise<IToken | undefined> {

    }

    // @ts-ignore
    async findTokenByUserId(userId: number): Promise<IToken | undefined> {

    }

    async deleteByParams(findObject: Partial<IToken>) {

    }
}

export const tokenRepository = new TokenRepository();
