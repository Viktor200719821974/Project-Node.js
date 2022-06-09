import {$authHost, $host} from "./index";

export const createBrand = async (brand) => {
    const {data} = await $authHost.post('/brand', brand);
    return data;
}
export const fetchBrands = async () => {
    const {data} = await $host.get('/brand');
    return data;
}