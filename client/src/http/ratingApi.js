import {$authHost, $host} from "./index";

export const getRatingDeviceId = async (deviceId) => {
    const {data} = await $host.get('/rating/' + deviceId);
    return data;
}
export const createRatingDeviceId = async (formData) => {
    const {data} = await $authHost.post('/rating', formData);
    return data;
}