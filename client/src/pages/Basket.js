import React from 'react';
import BasketComponent from "../components/BasketComponent";
import useAuth from "../hook/useAuth";

const Basket = () => {
    const {basket, devices, count} = useAuth();
    const deviceId = basket.map(c => c.deviceId);
    const arr = [];
    for (let i = 0; i < deviceId.length; i++){
        const filter = devices.rows.filter(c => c.id === deviceId[i]);
        arr.push(filter);
    }
    return (
        <div>
            {
                count === 0
                    ?
                    <div className={'basket_div_noContent'}>ВАША КОРЗИНА ПОРОЖНЯ</div>
                :
            arr.map((c, index) => <BasketComponent key={index} device={c} id={c.map(c => c.id)} total={index + 1}/>
            )}
        </div>
    );
};

export default Basket;