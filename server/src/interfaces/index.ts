import { Request } from 'express';
import { InferAttributes, InferCreationAttributes, Model } from 'sequelize';

export interface IDevice extends Model<InferAttributes<IDevice>, InferCreationAttributes<IDevice>>{
    id: number;
    name: string;
    typeId: number;
    brandId: number;
    price: number;
    rating: number;
}
export interface IUser extends Model<InferAttributes<IUser>, InferCreationAttributes<IUser>>{
    id: number;
    email: string;
    password: string;
    name: string;
    surname: string;
    phone: string;
    age: number;
    is_active: boolean;
    is_staff: boolean;
    is_superuser: boolean;
}
export interface ITokenDataToSave {
    refreshToken: string;
    accessToken: string;
    activateToken: string;
    userId: number;
}
export interface ITokenPair {
    accessToken: string;
    refreshToken: string;
}
export interface ITokenPairActivate {
    accessToken: string;
    refreshToken: string;
    activateToken: string;
}
export interface IUserPayload {
    userId: number,
    userEmail: string,
}

export type ITokenData = ITokenPairActivate & IUserPayload;

export interface IToken extends Model<InferAttributes<IToken>, InferCreationAttributes<IToken>>{
    refreshToken: string;
    accessToken: string;
    activateToken: string;
    userId: number;
    id: number;
    // createdAt: string;
    // deletedAt?: string;
}

export interface IRequestExtended extends Request{
    user?: IUser;
}

// eslint-disable-next-line max-len
export interface IImageDevice extends Model<InferAttributes<IImageDevice>, InferCreationAttributes<IImageDevice>> {
    id: number;
    // imageName: string;
    imageLocation: string;
    deviceId: number;
}

export interface IUserLogin{
    accessToken: string;
    refreshToken: string;
    user: IUser | null;
}
