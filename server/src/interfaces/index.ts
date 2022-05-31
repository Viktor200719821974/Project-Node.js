import { Request } from 'express';

export interface IDevice{
    id: number;
    name: string;
    typeId: number;
    brandId: number;
    price: string;
    rating: number;
    info: string;
    imageDevice: string;
}
export interface IUser{
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
    activateToken: string;
}

export interface IUserPayload {
    userId: number,
    userEmail: string,
}

export type ITokenData = ITokenPair & IUserPayload;

export interface IToken {
    refreshToken: string;
    accessToken: string;
    activateToken: string;
    userId: number;
    id: number;
    createdAt: string;
    deletedAt?: string;
}

export interface IRequestExtended extends Request{
    user?: IUser;
}

export interface IImageDevice {
    id: number;
    imageType: string;
    imageName: string;
    imageData: {};
}
