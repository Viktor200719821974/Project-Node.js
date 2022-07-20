import {$authHost, $host} from "./index";

export const createDevice = async (formData) => {
    const {data} = await $authHost.post('/devices', formData);
    return data;
}
export const getDevices = async (page, name, brandId, typeId) => {
    const {data} = await $host.get(`/devices?page=${page}&brandId=${brandId}&typeId=${typeId}&name=${name}`);
    return data;
}
export const getOneDevice = async (id) => {
    const {data} = await $host.get('/devices/' + id);
    return data;
}
export const updateDevice = async (id, formData) => {
    const {data} = await $authHost.patch(`/devices/${id}`, formData);
    return data;
}
export const deleteDevice = async(id) => {
    const {data} = await $authHost.delete('/devices/' + id);
    return data;
}
export const addInfoDevice = async(id, formData) => {
    const {data} = await $authHost.post(`/devices/info/${id}`, formData);
    return data;
}
export const changeInfoDevice = async(id, formData) => {
    const {data} = await $authHost.patch(`/devices/info/${id}`, formData);
    return data;
}
export const deleteInfoDevice = async(id) => {
    const {data} = await $authHost.delete(`/devices/info/${id}`);
    return data;
}