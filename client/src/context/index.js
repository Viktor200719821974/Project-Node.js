import { createContext } from "react";

export const AuthContext = createContext({
    isLogin: false,
    user: [],
    devices: null,
    basket: [],
    types: [],
    brands: [],
    count: 0,
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
    setBasket: () => {},
});