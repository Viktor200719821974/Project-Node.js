import React, {useEffect, useState} from 'react';
import {Button, Table} from "react-bootstrap";
import {MdDeleteForever} from "react-icons/md";
import useAuth from "../../hook/useAuth";
import {deleteDeviceFromBasket} from "../../http/basketApi";

const BasketComponent = ({device, number, price}) => {
    const {types, brands, setBasket} = useAuth();
    const [amount, setAmount] = useState(1);
    const [total, setTotal] = useState();
    // const a = price.concat();
    // const pr = device.map(c => c.price);
    const sum = price.reduce((result, number) => result + number);
    console.log(total);
    // let sum = 0;
    // for(let num of price ){
    //     sum = sum + (num * amount)
    // }
    // const arr = [];
    // arr.push(pr);
    // useEffect(() => {
    //     setTotal(price);
    //     arr.push(total);
    //     console.log(sum);
    // }, []);
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
                    <td>{number}</td>
                    <td>{types.filter(r => r.id === c.typeId).map(r => r.name)} {
                        brands.filter(r => r.id === c.brandId).map(r => r.name)
                    }
                        <br/>
                        {c.name}</td>
                    <td>
                        <input type={'number'} value={amount} min={'1'} onChange={(e) => setAmount(e.target.value)}/>
                    </td>
                    <td>
                        {c.price * amount} грн.
                    </td>
                    <td>
                        <Button
                            variant={'danger'}
                            onClick={() => deleteDeviceFromBasket(c.id).then(data => setBasket())}>
                            <MdDeleteForever/> Видалити
                        </Button>
                    </td>
                </tr>
                {/*<tr>*/}
                {/*    <td>*/}
                {/*        total: {c.price * amount}*/}
                {/*    </td>*/}
                {/*</tr>*/}
                </tbody>
            </Table>)}
            <div>Total: {sum} грн.</div>
        </div>
    );
};

export default BasketComponent;