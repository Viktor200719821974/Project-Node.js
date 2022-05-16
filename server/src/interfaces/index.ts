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
    role?: string;
}
