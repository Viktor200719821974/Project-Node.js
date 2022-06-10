import React, {useCallback, useMemo, useState} from 'react';
import {AuthContext} from '../context';

const AuthProvider = (props) => {

    const [isLogin, setIsLogin] = useState(false);
    const [user, setUser] = useState(null);
    const [devices, setDevicesData] = useState(null);
    const [types, setTypesData] = useState(null);
    const [brands, setBrandsData] = useState(null);
    const [selectedBrand, setSelectedBrandData] = useState(null);
    const [selectedType, setSelectedTypeData] = useState(null);
    const setData = useCallback((data) => {
        if (data){
            setIsLogin(true);
        }
        setUser(data.user);
    },[]);

    const setIsAuth = useCallback((data) => {
        if (data) {
            setIsLogin(true);
            setUser(data);
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
            setData,
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
            setSelectedType
        }),
        [brands, devices, isLogin, logOut, selectedBrand, selectedType, setBrands, setData, setDevices, setIsAuth, setSelectedBrand, setSelectedType, setTypes, types, user]
    );
    return (
        <AuthContext.Provider value={contextValue}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;