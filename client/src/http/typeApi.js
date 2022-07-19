import {$authHost, $host} from "./index";

export const createType = async (type) => {
    const {data} = await $authHost.post('/types', type);
    return data;
}
export const getTypes = async () => {
    const {data} = await $host.get('/types');
    return data;
}
export const changeType = async (id, formData) => {
    const {data} = await $authHost.put(`/types/${id}`, formData);
    return data;
}
export const deleteType = async (id) => {
    const {data} = await $authHost.delete('/types/' + id);
    return data;
}