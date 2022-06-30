import React, {useEffect, useState} from 'react';
import '../style/style.css';
import BasketComponent from "../components/basket/BasketComponent";
import useAuth from "../hook/useAuth";
import Delivery from "../components/basket/Delivery";
import PayDevice from "../components/basket/PayDevice";
import {Button, Table} from "react-bootstrap";
// import TestComponent from "../components/basket/TestComponent";

const Basket = () => {
    const [sum, setSum] = useState('');
    const [amountData, setAmountData] = useState();
    const [type, setType] = useState('');
    const [city, setCity] = useState('');
    const [street, setStreet] = useState('');
    const [house, setHouse] = useState('');
    const [room, setRoom] = useState('');
    const [comment, setComment] = useState('');
    const [department, setDepartment] = useState('');
    const [typePay, setTypePay] = useState('');
    const {basket, devices, count} = useAuth();

    const deviceId = basket.map(c => c.deviceId);
    const arr = [];
    for (let i = 0; i < deviceId.length; i++){
        const filter = devices.rows.filter(c => c.id === deviceId[i]);
        arr.push(filter);
    }

    const order = () => {
        const formData = new FormData();
        formData.append('type', type);
        formData.append('city', city);
        formData.append('street', street);
        formData.append('house', `${house}`);
        formData.append('room', `${room}`);
        formData.append('comment', comment);
        formData.append('department', `${department}`);
        formData.append('typePay', typePay);
        formData.append('', );
        formData.append('', );
        formData.append('', );
        formData.append('', );
    }

    useEffect(() => {
        if (basket.length > 0){
            setAmountData(basket.map(c => c.amount).reduce((result, number) => result + number));
            const arrayPrice = arr.map(c => c.map(c => c.price)[0]);
            const arrayAmount = basket.map(c => c.amount);
            let num = 0;
            for(var i=0; i< arrayPrice.length; i++) {
                num += arrayPrice[i]*arrayAmount[i];
            }
            setSum(num);
        }
    }, [basket]);

    return (
        <div>
            {count === 0
                ?
                    <div className={'basket_div_noContent'}>ВАША КОРЗИНА ПОРОЖНЯ</div>
                :
                <div>
                    {arr.map((c, index) => <BasketComponent
                        key={index}
                        device={c}
                        number={index + 1}
                    />)}
                    <div className={'basket_div_total_amount'}>
                        <div className={'basket_div_div_total_amount'}>
                            <div ><strong>Кількість:</strong> {amountData} шт.</div>
                            <div><strong>До сплати:</strong> {sum} грн.</div>
                        </div>
                    </div>
                    <div className={'basket_div_delivery_payDevice'}>
                        <Delivery
                            setType={setType}
                            setCity={setCity}
                            setStreet={setStreet}
                            setHouse={setHouse}
                            setRoom={setRoom}
                            setComment={setComment}
                            setDepartment={setDepartment}
                            type={type}
                            city={city}
                            street={street}
                            house={house}
                            room={room}
                            comment={comment}
                            department={department}
                        />
                    </div>
                    <div className={'basket_div_delivery_payDevice'}>
                        <PayDevice
                            typePay={typePay}
                            setTypePay={setTypePay}
                        />
                    </div>
                    <div className={'basket_div_button_order'}>
                        <Button
                            variant={'outline-primary'}
                            className={'basket_button_order'}
                            onClick={order}
                        >
                            Замовити
                        </Button>
                    </div>

            </div>}
            {/*<Table responsive>*/}
            {/*    <thead>*/}
            {/*    <tr>*/}
            {/*        <th>#</th>*/}
            {/*        <th>Продукт</th>*/}
            {/*        <th>Кількість</th>*/}
            {/*        <th>Вартість</th>*/}
            {/*        <th>Дія</th>*/}
            {/*    </tr>*/}
            {/*    </thead>*/}
            {/*    <tbody>*/}
            {/*    { arr.map((c, index) => <TestComponent*/}
            {/*        key={index}*/}
            {/*        device={c}*/}
            {/*        number={index + 1}*/}
            {/*    />)}*/}
            {/*    </tbody>*/}
            {/*</Table>*/}
        </div>
    );
};

export default Basket;