import {$authHost, $host} from "./index";

export const getImageDevice = async () => {
    const {data} = await $host.get('/imageDevice');
    return data;
}
export const getImageDeviceId = async (deviceId) => {
    const {data} = await $host.get('/imageDevice/' + deviceId);
    return data;
}
export const createImageDevice = async (id, formData) => {
    const {data} = await $authHost.post(`/imageDevice/${id}`, formData);
    return data;
}
export const deleteImageDevice = async (id) => {
    const {data} = await $authHost.delete('/imageDevice/' + id);
    return data;
}