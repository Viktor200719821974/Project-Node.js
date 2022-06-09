import { createContext } from "react";

export const AuthContext = createContext({
    isLogin: false,
    user: null,
    devices: null,
    types: null,
    brands: null,
    setData: () => {},
    setDevices: () => {},
    setTypes: () => {},
    setBrands: () => {},
    setIsAuth: () => {},
    logOut: () => {},
});