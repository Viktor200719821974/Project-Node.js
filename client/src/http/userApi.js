import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";

export const getUserId = async (accessToken) => {
       const {userId} = jwt_decode(accessToken);
    return await $authHost.get('/user/' + userId);
}
