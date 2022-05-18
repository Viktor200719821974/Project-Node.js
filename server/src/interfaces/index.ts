export interface IDevice{
    id: number;
    name: string;
    price: string;
    rating: number;
    image: string;
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
    userId: number;
}
export interface ITokenPair {
    accessToken: string;
    refreshToken: string;
}

export interface IUserPayload {
    userId: number,
    userEmail: string,
}

export type ITokenData = ITokenPair & IUserPayload;

export interface IToken {
    refreshToken: string;
    accessToken: string;
    userId: number;
    id: number;
    createdAt: string;
    deletedAt?: string;
}
