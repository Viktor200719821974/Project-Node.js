import {$authHost, $host} from "./index";

export const createDevice = async (device) => {
    const {data} = await $authHost.post('/device', device);
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