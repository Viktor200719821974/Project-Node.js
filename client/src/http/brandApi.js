import {$authHost, $host} from "./index";

export const createBrand = async (brand) => {
    const {data} = await $authHost.post('/brand', brand);
    return data;
}
export const getBrands = async () => {
    const {data} = await $host.get('/brand');
    return data;
}
export const changeBrand = async (id, formData) => {
    const {data} = await $authHost.put(`/brand/${id}`, formData);
    return data;
}
export const deleteBrand = async (id) => {
    const {data} = await $authHost.delete('/brand/' + id);
    return data;
}