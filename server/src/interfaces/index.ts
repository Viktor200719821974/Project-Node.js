import { Request } from 'express';
import { InferAttributes, InferCreationAttributes, Model } from 'sequelize';

export interface IDevice extends Model<InferAttributes<IDevice>, InferCreationAttributes<IDevice>>{
    id: number;
    name: string;
    color: string;
    typeId: number;
    brandId: number;
    price: number;
    width: number;
    height: number;
    depth: number;
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
export interface ITokenDataToSaveActivate {
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

export interface ITokenActivate
    extends Model<InferAttributes<ITokenActivate>, InferCreationAttributes<ITokenActivate>> {
    activateToken: string;
    userId: number;
    id: number;
}
export interface IUserPayload {
    userId: number,
    userEmail: string,
}

export type ITokenData = ITokenPairActivate & IUserPayload;

export interface IToken extends Model<InferAttributes<IToken>, InferCreationAttributes<IToken>>{
    refreshToken: string;
    accessToken: string;
    userId: number;
    id: number;
}

export interface IRequestExtended extends Request{
    user?: IUser;
}

export interface IImageDevice
    extends Model<InferAttributes<IImageDevice>, InferCreationAttributes<IImageDevice>> {
    id: number;
    imageLocation: string;
    deviceId: number;
}
export interface IPaginationResponse<T> {
    page: number,
    perPage: number,
    count: number,
    rows: T[],
}

export interface IBasketDevice
    extends Model<InferAttributes<IBasketDevice>, InferCreationAttributes<IBasketDevice>> {
    id: number;
    basketId: number;
    deviceId: number;
    amount: number;
}
export interface IBasket extends Model<InferAttributes<IBasket>, InferCreationAttributes<IBasket>> {
    id: number;
    userId: number;
}
