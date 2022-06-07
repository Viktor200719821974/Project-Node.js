import {$authHost, $host} from "./index";

export const createType = async (type) => {
    const {data} = await $authHost.post('/type', type);
    return data;
}
export const fetchTypes = async () => {
    const {data} = await $host.get('/type');
    return data;
}
export const createBrand = async (brand) => {
    const {data} = await $authHost.post('/brand', brand);
    return data;
}
export const fetchBrands = async () => {
    const {data} = await $host.get('/brand');
    return data;
}
export const createDevice = async (device) => {
    const {data} = await $host.post('/device', device);
    return data;
}
export const fetchDevices = async () => {
    const {data} = await $host.get('/device');
    return data.rows;
}
export const fetchOneDevice = async (id) => {
    const {data} = await $host.get('/device/' + id);
    return data;
}
export const addImageDevice = async (id, formData) => {
    const {data} = await $authHost.post(`/imageDevice/addImageAws/${id}`, formData);
    return data;
}