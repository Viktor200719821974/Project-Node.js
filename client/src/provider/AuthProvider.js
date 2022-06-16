import React, {useCallback, useMemo, useState} from 'react';
import {AuthContext} from '../context';
import {getUserId} from "../http/userApi";
import {getBasketDevice} from "../http/basketApi";

const AuthProvider = (props) => {

    const [isLogin, setIsLogin] = useState(false);
    const [user, setUser] = useState([]);
    const [devices, setDevicesData] = useState(null);
    const [types, setTypesData] = useState([]);
    const [brands, setBrandsData] = useState([]);
    const [selectedBrand, setSelectedBrandData] = useState(null);
    const [selectedType, setSelectedTypeData] = useState(null);
    const [basket, setBasketData] = useState([]);
    const [count, setCount] = useState(0);

    const setBasket = useCallback(() => {
        getBasketDevice().then(value => {
            if (value.length > 0) {
                setBasketData(value);
                setCount(value.length);
            } else {
                setBasketData([]);
                setCount(0);
            }
        });
    },[]);

    const setIsAuth = useCallback((accessToken) => {
        if (accessToken) {
            getUserId(accessToken).then(data => {
                if (data.request.status === 200){
                    setUser(data.data);
                    setIsLogin(true);
                    setBasket();
                }
            });
        }
    }, []);

    const setDevices = useCallback((data) => {
        setDevicesData(data);
    },[]);

    const setTypes = useCallback((data) => {
        setTypesData(data);
    },[]);

    const setBrands = useCallback((data) => {
        setBrandsData(data);
    },[]);

    const setSelectedBrand = useCallback((data) => {
        setSelectedBrandData(data);
    },[]);

    const setSelectedType = useCallback((data) => {
        setSelectedTypeData(data);
    },[]);
    
    const logOut = useCallback(() => {
        setUser(null);
        setIsLogin(false);
    }, []);

    const contextValue = useMemo(
        () => ({
            isLogin,
            user,
            devices,
            setTypes,
            setDevices,
            types,
            brands,
            setBrands,
            logOut,
            setIsAuth,
            setSelectedBrand,
            selectedBrand,
            selectedType, 
            setSelectedType,
            basket,
            count,
            setBasket
        }),
        [
            basket, brands, count, devices, isLogin, logOut, selectedBrand, selectedType, setBrands, setDevices,
            setIsAuth, setSelectedBrand, setSelectedType, setTypes, types, user, setBasket,
        ]
    );
    return (
        <AuthContext.Provider value={contextValue}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;