import {$authHost, $host} from "./index";
import jwtDecode from "jwt-decode";

export const registration = async (email, password) => {
    const {data} = await $host.post('api/user/registration', {email, password, role: 'ADMIN'});
    localStorage.setItem('token', data.token);
    return jwtDecode(data.token);
}
export const login = async (email, password) => {
    const {data} = await $host.post('api/user/auth/login', {email, password});
    return data;
    // localStorage.setItem('token', data.token);
    // return jwtDecode(data.token);
}
export const check = async () => {
    const {data} = await $authHost.get('api/user/auth');
    localStorage.setItem('token', data.token);
    return jwtDecode(data.token);
}