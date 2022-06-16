import React, {useState} from 'react';
import {Button, Table} from "react-bootstrap";
import {MdDeleteForever} from "react-icons/md";
import useAuth from "../hook/useAuth";
import {deleteDeviceFromBasket} from "../http/basketApi";

const BasketComponent = ({device, id, total}) => {
    const {types, brands, setBasket} = useAuth();
    const [amount, setAmount] = useState(1);
    return (
        <div>
            {device.map(c => <Table striped bordered hover key={c.id}>
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
                <tr>
                    <td>{total}</td>
                    <td>{types.filter(r => r.id === c.typeId).map(r => r.name)} {
                        brands.filter(r => r.id === c.brandId).map(r => r.name)
                    }
                        <br/>
                        {c.name}</td>
                    <td>
                        <input type={'number'} value={amount} onChange={(e) => setAmount(e.target.value)}/>
                    </td>
                    <td>
                        {c.price} грн.
                    </td>
                    <td>
                        <Button
                            variant={'danger'}
                            onClick={() => deleteDeviceFromBasket(c.id).then(data => setBasket())}>
                            <MdDeleteForever/> Видалити
                        </Button>
                    </td>
                </tr>
                </tbody>
            </Table>)}
        </div>
    );
};

export default BasketComponent;