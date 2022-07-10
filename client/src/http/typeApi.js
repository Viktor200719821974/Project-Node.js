import {$authHost, $host} from "./index";

export const createType = async (type) => {
    const {data} = await $authHost.post('/type', type);
    return data;
}
export const getTypes = async () => {
    const {data} = await $host.get('/type');
    return data;
}
export const changeType = async (id, formData) => {
    const {data} = await $authHost.put(`/type/${id}`, formData);
    return data;
}
export const deleteType = async (id) => {
    const {data} = await $authHost.delete('/type/' + id);
    return data;
}