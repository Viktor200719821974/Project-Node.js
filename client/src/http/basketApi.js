import {$authHost} from "./index";

export const createBasketDevice = async (deviceId) => {
    const {data} = await $authHost.post('/basket/' + deviceId);
    return data;
}
export const getBasketDevice = async () => {
    const {data} = await $authHost.get('/basket');
    return data;
}
export const deleteDeviceFromBasket = async (id) => {
    const {data} = await $authHost.delete('/basket/' + id);
    return data;
}
export const updateDeviceAmountBasket = async (deviceId, amount) => {
    const {data} = await $authHost.patch(`/basket/amount/${deviceId}`, amount);
    return data;
}