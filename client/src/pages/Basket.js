import React from 'react';
import '../style/style.css';
import BasketComponent from "../components/basket/BasketComponent";
import useAuth from "../hook/useAuth";
import Delivery from "../components/basket/Delivery";
import PayDevice from "../components/basket/PayDevice";
import {Button, Table} from "react-bootstrap";
import TestComponent from "../components/basket/TestComponent";

const Basket = () => {
    const {basket, devices, count} = useAuth();
    const deviceId = basket.map(c => c.deviceId);
    const arr = [];
    for (let i = 0; i < deviceId.length; i++){
        const filter = devices.rows.filter(c => c.id === deviceId[i]);
        arr.push(filter);
    }
    const amount = basket.map(c => c.amount).reduce((result, number) => result + number);
    const arrayPrice = arr.map(c => c.map(c => c.price)[0]);
    const arrayAmount = basket.map(c => c.amount);
    let sum = 0;
    for(var i=0; i< arrayPrice.length; i++) {
        sum += arrayPrice[i]*arrayAmount[i];
    }
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
                    />
                    )}
            {count > 0 &&
                <div>
                    <div className={'basket_div_total_amount'}>
                        <div className={'basket_div_div_total_amount'}>
                            <div ><strong>Кількість:</strong> {amount} шт.</div>
                            <div><strong>До сплати:</strong> {sum} грн.</div>
                        </div>
                    </div>
                <Delivery/>
                <hr/>
                <PayDevice/>
                <hr/>
                <Button variant={'outline-primary'} className={'mgb-30px'}>Замовити</Button>
            </div>}
            <Table responsive>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Продукт</th>
                    <th>Кількість</th>
                    <th>Вартість</th>
                    <th>Дія</th>
                </tr>
                </thead>
                <tbody>
                { arr.map((c, index) => <TestComponent
                    key={index}
                    device={c}
                    number={index + 1}
                />)}
                </tbody>
            </Table>
        </div>
    );
};

export default Basket;