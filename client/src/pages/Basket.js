import React from 'react';
import BasketComponent from "../components/BasketComponent";
import useAuth from "../hook/useAuth";

const Basket = () => {
    const {basket, devices} = useAuth();
    const deviceId = basket.map(c => c.deviceId);
    console.log(deviceId);
    const arr = [];
    for (let i; i < devices.length; i++){
        console.log(i);
        arr.push(devices.filter(c => c.deviceId === i));
    }
    console.log(arr);
    return (
        <div>
           <BasketComponent/>
        </div>
    );
};

export default Basket;