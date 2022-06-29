import React, {useCallback, useMemo, useState} from 'react';
import {AuthContext} from '../context';
import {getUserId} from "../http/userApi";
import {getBasketDevice, updateDeviceAmountBasket} from "../http/basketApi";

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
                setBasketData(value.sort((a, b) => a.id - b.id));
                setCount(value.map(c => c.amount).reduce((result, number) => result + number));
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
            }).catch(err => {
                if (accessToken){
                    if (err.response.status === 500) {
                        localStorage.removeItem('accessToken');
                        localStorage.removeItem('refreshToken');
                    }
                }
            });
        }
    }, []);

    const setAmount = useCallback((amount, deviceId) => {
        const formData = new FormData();
        formData.append('amount', `${amount}`);
        updateDeviceAmountBasket(deviceId, formData).then(data => {
            if (data) {
                setBasket();
            }
        })
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
            setBasket,
            setAmount,
        }),
        [
            basket, brands, count, devices, isLogin, logOut, selectedBrand, selectedType, setBrands, setDevices,
            setIsAuth, setSelectedBrand, setSelectedType, setTypes, types, user, setBasket, setAmount,
        ]
    );
    return (
        <AuthContext.Provider value={contextValue}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;