import React from 'react';
import {Button, Table} from "react-bootstrap";
import {MdDeleteForever} from "react-icons/md";

const BasketComponent = () => {
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
                <tr>
                    <td>1</td>
                    <td>Mark</td>
                    <td>
                        <input type={'number'}/>
                    </td>
                    <td>
                        грн.
                    </td>
                    <td>
                        <Button variant={'danger'}><MdDeleteForever/> Видалити</Button>
                    </td>
                </tr>
                </tbody>
            </Table>
        </div>
    );
};

export default BasketComponent;