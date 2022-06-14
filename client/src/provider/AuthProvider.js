import React, {useCallback, useMemo, useState} from 'react';
import {AuthContext} from '../context';
import {getUserId} from "../http/userApi";
import {getBasketDevice} from "../http/basketApi";

const AuthProvider = (props) => {

    const [isLogin, setIsLogin] = useState(false);
    const [user, setUser] = useState(null);
    const [devices, setDevicesData] = useState(null);
    const [types, setTypesData] = useState(null);
    const [brands, setBrandsData] = useState(null);
    const [selectedBrand, setSelectedBrandData] = useState(null);
    const [selectedType, setSelectedTypeData] = useState(null);
    const [basket, setBasket] = useState(null);
    const [count, setCount] = useState(null);

    // const setData = useCallback((data) => {
    //     if (data){
    //         setIsLogin(true);
    //     }
    //     setUser(data.user);
    // },[]);

    const setIsAuth = useCallback((accessToken) => {
        if (accessToken) {
            getUserId(accessToken).then(data => {
                if (data.request.status === 200){
                    setUser(data.data);
                    setIsLogin(true);
                    getBasketDevice(data.data.basket.id).then(data => {
                        if (data){
                            setBasket(data);
                            setCount(data.length);
                        }
                    });
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
            // setData,
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
            count
        }),
        [
            basket, brands, count, devices, isLogin, logOut, selectedBrand, selectedType, setBrands, setDevices,
            setIsAuth, setSelectedBrand, setSelectedType, setTypes, types, user,
        ]
    );
    return (
        <AuthContext.Provider value={contextValue}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;