import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";

export const getUserId = async (accessToken) => {
       const {userId} = jwt_decode(accessToken);
    return await $authHost.get('/users/' + userId);
}
export const activateAccount = async (token) => {
    const {data} = await $host.get(`/users/activateUser/${token}`);
    return data;
}
export const getUsers = async (page, email) => {
    const {data} = await $authHost.get(`/users?page=${page}&email=${email}`);
    return data;
}
export const userManager = async (id) => {
    const {data} = await $authHost.patch(`/users/userManager/${id}`);
    return data;
}
export const userIsNotManager = async (id) => {
    const {data} = await $authHost.patch(`/users/userIsNotManager/${id}`);
    return data;
}
export const userIsBlocked = async (id) => {
    const {data} = await $authHost.patch(`/users/userBlocked/${id}`);
    return data;
}
export const userIsUnlocked = async (id) => {
    const {data} = await $authHost.patch(`/users/userUnlocked/${id}`);
    return data;
}
export const deleteUser = async (id) => {
    const {data} = await $authHost.delete(`/users/${id}`);
    return data;
}