import React from 'react';
import {Button, Table} from "react-bootstrap";
import {MdDeleteForever} from "react-icons/md";
import useAuth from "../../hook/useAuth";
import {deleteDeviceFromBasket} from "../../http/basketApi";
import AmountComponent from "./AmountComponent";

const BasketComponent = ({device, number}) => {
    const {types, brands, setBasket, setAmount, basket} = useAuth();
    return (
        <div>
            <Table striped bordered hover>
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
            {device.map(c => <tr key={c.id}>
                    <td>{number}</td>
                    <td>{types.filter(r => r.id === c.typeId).map(r => r.name)} {
                        brands.filter(r => r.id === c.brandId).map(r => r.name)
                    }
                        <br/>
                        {c.name}</td>
                    <td>
                        {basket.filter(a => a.deviceId === c.id).map((a, index) =>
                            <AmountComponent
                                key={index}
                                amount={a.amount}
                                deviceId={a.deviceId}/>)}
                    </td>
                    <td>
                        {c.price * basket.filter(a => a.deviceId === c.id).map(c => c.amount)} грн.
                    </td>
                    <td>
                        <Button
                            variant={'danger'}
                            onClick={() => deleteDeviceFromBasket(c.id).then(data => {
                                setBasket();
                                setAmount(1, c.id);
                            })}>
                            <MdDeleteForever/> Видалити
                        </Button>
                    </td>
                </tr>)}
                </tbody>
            </Table>
        </div>
    );
};

export default BasketComponent;