import {$authHost, $host} from "./index";

export const createBrand = async (brand) => {
    const {data} = await $authHost.post('/brands', brand);
    return data;
}
export const getBrands = async () => {
    const {data} = await $host.get('/brands');
    return data;
}
export const changeBrand = async (id, formData) => {
    const {data} = await $authHost.put(`/brands/${id}`, formData);
    return data;
}
export const deleteBrand = async (id) => {
    const {data} = await $authHost.delete('/brands/' + id);
    return data;
}