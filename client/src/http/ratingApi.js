import {$host} from "./index";

export const getRatingDeviceId = async (deviceId) => {
    const {data} = await $host.get('/rating/' + deviceId);
    return data;
}