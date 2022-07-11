import {$authHost, $host} from "./index";

export const createDevice = async (formData) => {
    const {data} = await $authHost.post('/device', formData);
    return data;
}
export const getDevices = async (page, name, brandId, typeId) => {
    const {data} = await $host.get(`/device?page=${page}&brandId=${brandId}&typeId=${typeId}&name=${name}`);
    return data;
}
export const getOneDevice = async (id) => {
    const {data} = await $host.get('/device/' + id);
    return data;
}
export const updateDevice = async (id, formData) => {
    const {data} = await $authHost.patch(`/device/${id}`, formData);
    return data;
}
export const deleteDevice = async(id) => {
    const {data} = await $authHost.delete('/device/' + id);
    return data;
}