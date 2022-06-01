import {$authHost, $host} from "./index";
import jwtDecode from "jwt-decode";

export const registration = async (email, password) => {
    const {data} = await $host.post('/user/registration', {email, password, role: 'ADMIN'});
    localStorage.setItem('token', data.token);
    return jwtDecode(data.token);
}
export const login = async (email, password) => {
    const {data} = await $host.post('/auth/login', {email, password});
    localStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data;
}
export const logout = async () => {
    return await $host.post('/auth/logout');
}
export const check = async () => {
    const {data} = await $authHost.get('/user/auth');
    localStorage.setItem('token', data.token);
    return jwtDecode(data.token);
}
export const fetchUserId = async (id) => {
    return await $host.post('/user/' + id);

}