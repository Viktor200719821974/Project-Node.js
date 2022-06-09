import {$authHost, $host} from "./index";
import {IMAGE_DEVICE_ROUTE, REACT_APP_API_URL} from "../utils/constans";

export const fetchImageDevice = async () => {
    const {data} = await $host.get(REACT_APP_API_URL + IMAGE_DEVICE_ROUTE);
    return data;
}

export const addImageDevice = async (id, formData) => {
    const {data} = await $authHost.post(`/imageDevice/addImageAws/${id}`, formData);
    return data;
}