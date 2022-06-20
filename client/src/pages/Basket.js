import React, {useState} from 'react';
import BasketComponent from "../components/basket/BasketComponent";
import useAuth from "../hook/useAuth";
import Delivery from "../components/basket/Delivery";
import PayDevice from "../components/basket/PayDevice";
import {Button} from "react-bootstrap";

const Basket = () => {
    const {basket, devices, count} = useAuth();
    const deviceId = basket.map(c => c.deviceId);
    const arr = [];
    for (let i = 0; i < deviceId.length; i++){
        const filter = devices.rows.filter(c => c.id === deviceId[i]);
        arr.push(filter);
    }
    const arrayPrice = arr.map(c => c.map(c => c.price)[0]);
    // const b = pr.map(c => console.log(c));
    // let sum = 0;
    // for(let i=0; i <= pr.length; i++ ){
    //     sum = sum + pr[i];
    //     console.log(pr[i]);
    // }
    // useEffect(() => {
    //     setTotal(price);
    //     arr.push(total);
    // }, []);
    return (
        <div>
            {count === 0
                ?
                    <div className={'basket_div_noContent'}>ВАША КОРЗИНА ПОРОЖНЯ</div>
                :
                    arr.map((c, index) => <BasketComponent
                        key={index}
                        device={c}
                        number={index + 1}
                        price={arrayPrice}/>)
            }
            {count > 0 && <div>
                <Delivery/>
                <hr/>
                <PayDevice/>
                <hr/>
                <Button variant={'outline-primary'} className={'mgb-30px'}>Замовити</Button>
            </div>}
        </div>
    );
};

export default Basket;