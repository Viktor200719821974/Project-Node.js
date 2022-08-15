import React from 'react';
import {Button, Table} from "react-bootstrap";
import {MdDeleteForever} from "react-icons/md";
import useAuth from "../../hook/useAuth";
import {deleteDeviceFromBasket} from "../../http/basketApi";
import AmountComponent from "./AmountComponent";
import ImageBasketComponent from "./ImageBasketComponent";

const BasketComponent = ({device, number, setStatusResponse}) => {
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
                    <td style={{display: 'flex', alignItems: 'center'}}>
                            <ImageBasketComponent deviceId={c.id}/>
                        <div>
                            <div style={{display: 'flex'}}>
                                <div style={{marginRight: '5px'}}>
                                    {types.filter(r => r.id === c.typeId).map(r => r.name)}
                                </div>
                                <div>
                                    {brands.filter(r => r.id === c.brandId).map(r => r.name)}
                                </div>
                            </div>
                            <div>
                                {c.name}
                            </div>
                        </div>
                    </td>
                    <td>
                        {basket.filter(a => a.deviceId === c.id).map((a, index) =>
                            <AmountComponent
                                key={index}
                                amount={a.amount}
                                deviceId={a.deviceId}
                            />
                        )}
                    </td>
                    <td>
                        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                            {c.price * basket.filter(a => a.deviceId === c.id).map(c => c.amount)} грн.
                        </div>
                    </td>
                    <td>
                        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <Button
                            variant={'danger'}
                            onClick={() => deleteDeviceFromBasket(c.id).then(data => {
                                if(data === 'Ok'){
                                    setBasket();
                                    setAmount(1, c.id);
                                    setStatusResponse(true);
                                }
                            })}>
                            <MdDeleteForever/> Видалити
                        </Button></div>
                    </td>
                </tr>)}
                </tbody>
            </Table>
        </div>
    );
};

export default BasketComponent;