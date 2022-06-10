import {$authHost, $host} from "./index";

export const createDevice = async (device) => {
    const {data} = await $authHost.post('/device', device);
    return data;
}
export const getDevices = async (brandId?, typeId?) => {
    const {data} = await $host.get(`/device?brandId=${brandId}&typeId=${typeId}`);
    return data.rows;
}
export const getOneDevice = async (id) => {
    const {data} = await $host.get('/device/' + id);
    return data;
}