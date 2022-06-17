import {$authHost, $host} from "./index";

export const getRatingDeviceId = async (deviceId) => {
    const {data} = await $host.get('/rating/' + deviceId);
    return data;
}
export const createRatingDeviceId = async (deviceId) => {
    const {data} = await $authHost.post('/rating', deviceId);
    return data;
}