import React, {useCallback, useMemo, useState} from 'react';
import {AuthContext} from '../context';
import {fetchRefresh} from "../http/userApi";

const AuthProvider = (props) => {

    const [isLogin, setIsLogin] = useState(false);
    const [user, setUser] = useState(null);
    const [devices, setDevicesData] = useState(null);
    const [types, setTypesData] = useState(null);
    const [brands, setBrandsData] = useState(null);

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
        const refresh = async () => {
            await fetchRefresh().then(data => console.log(data));
        }
        refresh();
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
        }),
        [brands, devices, isLogin, logOut, setBrands, setData, setDevices, setIsAuth, setTypes, types, user]
    );
    return (
        <AuthContext.Provider value={contextValue}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;