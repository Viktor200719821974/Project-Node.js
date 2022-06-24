import {$authHost, $host} from "./index";

export const createDevice = async (formData) => {
    const {data} = await $authHost.post('/device', formData);
    return data;
}
export const getDevices = async (brandId?, typeId?, page?) => {
    const {data} = await $host.get(`/device?page=${page}&brandId=${brandId}&typeId=${typeId}`);
    return data;
}
export const getOneDevice = async (id) => {
    const {data} = await $host.get('/device/' + id);
    return data;
}