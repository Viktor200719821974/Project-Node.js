import axios from "axios";
import { REACT_APP_API_URL} from "../utils/constans";

const $host = axios.create({
    baseURL: REACT_APP_API_URL
});
const $authHost = axios.create({
    baseURL: REACT_APP_API_URL
});
const $refreshHost = axios.create({
    baseURL: REACT_APP_API_URL
});
// const authInterceptor = config => {
//     config.headers.authorization = `Bearer ${localStorage.getItem('accessToken')}`;
//     return config
// }
const refreshInterceptor = config => {
    config.headers.authorization = localStorage.getItem('refreshToken');
    return config
}

$refreshHost.interceptors.request.use(refreshInterceptor);

$authHost.interceptors.request.use((config) => {
        const authToken = localStorage.getItem("accessToken");
        if (authToken) {
            config.headers.authorization = `Bearer ${authToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    });

$authHost.interceptors.response.use(
    (res) => {
        console.log(res.data);
        return res;
    },
    async (err) => {
        console.log(err);
        const refreshToken = localStorage.getItem("refreshToken");
        const originalConfig = err.config;
        if (refreshToken && originalConfig.url !== "/auth/login" && err.response ){
            if ((err.response.status === 401 || err.response.data.message === 'jwt expired') && !originalConfig._retry){
                console.log(err.response.data.message);
                originalConfig._retry = true;

                try{
                    const rs = await $refreshHost.post("/auth/refresh",{
                        refreshToken: localStorage.getItem('refreshToken'),
                    });
                    console.log(rs);
                    localStorage.setItem('accessToken', rs.data.accessToken);
                    localStorage.setItem('refreshToken', rs.data.refreshToken);
                    return $authHost(originalConfig);
                }catch (_error) {
                    console.log(_error);
                    return Promise.reject(_error);
                }
            }
        }
        return Promise.reject(err);
    }
);
export {
    $host,
    $authHost,
    $refreshHost
}
