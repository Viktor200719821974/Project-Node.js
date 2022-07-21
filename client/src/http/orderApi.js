import {$authHost} from "./index";

export const orderDevice = async (formData) => {
    const {data} = await $authHost.post('/order', formData);
    return data;
}