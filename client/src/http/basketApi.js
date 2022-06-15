import {$authHost, $host} from "./index";

export const createBasketDevice = async (deviceId) => {
    const {data} = await $authHost.post('/basket/' + deviceId);
    return data;
}
export const getBasketDevice = async (id) => {
    const {data} = await $host.get('/basket/' + id);
    return data;
}