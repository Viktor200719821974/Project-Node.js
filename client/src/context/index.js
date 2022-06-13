import { createContext } from "react";

export const AuthContext = createContext({
    isLogin: false,
    user: null,
    devices: null,
    basket: null,
    types: null,
    brands: null,
    count: null,
    selectedBrand: null,
    selectedType: null,
    setData: () => {},
    setDevices: () => {},
    setTypes: () => {},
    setBrands: () => {},
    setIsAuth: () => {},
    logOut: () => {},
    setSelectedBrand: () => {},
    setSelectedType: () => {},
});