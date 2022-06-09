import {$authHost, $host, $refreshHost} from "./index";
// import jwtDecode from "jwt-decode";

export const registration = async (email, password, name, surname, age, phone) => {
    const {data} = await $host.post('/auth/registration', {email, password, name, surname, age, phone});
    return data;
}
export const login = async (email, password) => {
    const {data} = await $host.post('/auth/login', {email, password});
    localStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data;
}
export const logOutUser = async () => {
    return await $authHost.post('/auth/logout');
}
export const check = async () => {
    const {data} = await $authHost.get('/user/auth');
    return data;
}
export const fetchUserId = async (id) => {
    return await $host.post('/user/' + id);
}
export const fetchRefresh = async () => {
    return await $refreshHost.post('/auth/refresh');
}