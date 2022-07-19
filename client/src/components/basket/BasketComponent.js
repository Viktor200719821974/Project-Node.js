import React from 'react';
import {Button, Image, Table} from "react-bootstrap";
import {MdDeleteForever} from "react-icons/md";
import useAuth from "../../hook/useAuth";
import {deleteDeviceFromBasket} from "../../http/basketApi";
import AmountComponent from "./AmountComponent";
import noImage from "../../image/no_image.jpg";
import ImageBasketComponent from "./ImageBasketComponent";

const BasketComponent = ({device, number, image}) => {
    const {types, brands, setBasket, setAmount, basket} = useAuth();
    // const img = image.map(c => c.map(b => b.imageLocation)[0]);
    // console.log(img);
    console.log(image);
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
                        {/*{image.map((b, index) =>*/}
                        {/*    <ImageBasketComponent*/}
                        {/*        image={image[0]}*/}
                        {/*    />*/}
                        {image.map((c, index) => <Image src={c[0] || noImage} alt='' key={index}
                                          style={{width: '150px', height: 'auto', marginRight: '20px'}}/>)}
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