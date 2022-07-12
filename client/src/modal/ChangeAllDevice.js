import React, {useState} from 'react';
import {Alert, Button, Dropdown, Form, Modal} from "react-bootstrap";
import useAuth from "../hook/useAuth";
import {updateDevice} from "../http/deviceApi";

const ChangeAllDevice = ({show, onHide, id, device, setStatusResponse}) => {
    const {types, brands} = useAuth();
    const [name, setName] = useState('');
    const [color, setColor] = useState('');
    const [width, setWidth] = useState('');
    const [height, setHeight] = useState('');
    const [depth, setDepth] = useState('');
    const [price, setPrice] = useState('');
    const [selectedBrand, setSelectedBrand] = useState('');
    const [selectedType, setSelectedType] = useState('');
    const [error, setError] = useState('');

    const update = async () => {
        try {
            const formData = new FormData();
            formData.append('name', name || device.name);
            formData.append('color', color || device.color);
            formData.append('width', `${width}` || device.width);
            formData.append('height', `${height}` || device.height);
            formData.append('depth', `${depth}` || device.depth);
            formData.append('price', `${price}` || device.price);
            formData.append('brandId', selectedBrand.id || device.brandId);
            formData.append('typeId', selectedType.id || device.typeId);
            updateDevice(id, formData).then(data => {
                if (data.name) {
                    setError('');
                    setStatusResponse(true);
                    onHide();
                }
            }).catch(err => {
                console.log(err);
                if (err.response) {
                    setError(err.response.data.message || err.message);
                }
            });
        }catch (e) {
            console.log(e);
        }
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Обновити дані пристроя
                </Modal.Title>
            </Modal.Header>
            {error && <Alert variant={'danger'} style={{textAlign: 'center', fontSize: '20px'}}>{error}</Alert>}
            <Modal.Body>
                <Form>
                    <Dropdown className={"mt-2 mb-2"}>
                        <Dropdown.Toggle>{selectedType.name || 'Виберіть тип'} </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {
                                types && types.map(type => <Dropdown.Item
                                        key={type.id}
                                        onClick={() => setSelectedType(type)}>
                                        {type.name}
                                    </Dropdown.Item>
                                )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown className={"mt-2 mb-2"}>
                        <Dropdown.Toggle>{selectedBrand.name || 'Виберіть бренд'}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {
                                brands && brands.map(brand => <Dropdown.Item
                                        key={brand.id}
                                        onClick={() => setSelectedBrand(brand)}>
                                        {brand.name}
                                    </Dropdown.Item>
                                )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Form.Control
                        placeholder={`Введіть назву пристрою...було ${device.name}`}
                        className={"mt-3"}
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <Form.Control
                        placeholder={`Введіть колір пристрою...було ${device.color}`}
                        className={"mt-3"}
                        value={color}
                        onChange={e => setColor(e.target.value)}
                    />
                    <Form.Control
                        placeholder={`Введіть ширину пристрою...було ${device.width}`}
                        className={"mt-3"}
                        type={"number"}
                        value={width}
                        onChange={e => setWidth(e.target.value)}
                    />
                    <Form.Control
                        placeholder={`Введіть висоту пристрою...було ${device.height}`}
                        className={"mt-3"}
                        type={"number"}
                        value={height}
                        onChange={e => setHeight(e.target.value)}
                    />
                    <Form.Control
                        placeholder={`Введіть глубину пристрою...було ${device.depth}`}
                        className={"mt-3"}
                        type={"number"}
                        value={depth}
                        onChange={e => setDepth(e.target.value)}
                    />
                    <Form.Control
                        placeholder={`Введіть вартість пристрою...було ${device.price}`}
                        className={"mt-3"}
                        type={"number"}
                        value={price}
                        onChange={e => setPrice(e.target.value)}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"outline-success"} onClick={update} style={{marginTop: 2}}>Обновити</Button>
                <Button variant={"outline-danger"} onClick={onHide}>Закрити</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ChangeAllDevice;