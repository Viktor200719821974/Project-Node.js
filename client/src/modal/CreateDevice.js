import React, {useContext, useEffect, useState} from 'react';
import {Button, Col, Dropdown, Form, Modal, Row} from "react-bootstrap";
import {Context} from "../index";
import {createDevice, fetchBrands, fetchTypes} from "../http/deviceApi";
import {observer} from "mobx-react-lite";

const CreateDevice = observer(({show, onHide}) => {
    const {device} = useContext(Context)
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [file, setFile] = useState(null);
    const [info, setInfo] = useState([]);
    useEffect(() => {
        fetchTypes().then(data => device.setTypes(data));
        fetchBrands().then(data => device.setBrands(data));
    }, [device])

    const addInfo = () => {
        setInfo([...info, {title: '', description: '', number: Date.now()}]);
    }
    const removeInfo = (number) => {
        setInfo(info.filter(i => i.number !== number));
    }
    const changeInfo = (key, value, number) => {
        setInfo(info.map(i => i.number === number ? {...i, [key]: value} : i));
    }

    const selectFile = e => {
        setFile(e.target.files[0]);
    }

    const addDevice = () => {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', `${price}`);
        formData.append('image', file);
        formData.append('brandId', device.selectedBrand.id);
        formData.append('typeId', device.selectedType.id);
        formData.append('info', JSON.stringify(info));
        createDevice(formData).then(data => onHide());
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
                    Додати новий пристрій
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Dropdown className={"mt-2 mb-2"}>
                        <Dropdown.Toggle>{device.selectedType.name || 'Виберіть тип'} </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {device.types.map(type =>
                            <Dropdown.Item key={type.id} onClick={() => device.setSelectedType(type)}>
                                {type.name}
                            </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown className={"mt-2 mb-2"}>
                        <Dropdown.Toggle>{device.selectedBrand.name || 'Виберіть бренд'}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {device.brands.map(brand =>
                                <Dropdown.Item key={brand.id} onClick={() => device.setSelectedBrand(brand)}>
                                    {brand.name}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Form.Control
                        placeholder={"Введіть назву пристрою"}
                        className={"mt-3"}
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <Form.Control
                        placeholder={"Введіть вартість пристрою"}
                        className={"mt-3"} type={"number"}
                        value={price}
                        onChange={e => setPrice(e.target.value)}
                    />
                    <Form.Control
                        className={"mt-3"}
                        type={"file"}
                        onChange={selectFile}
                    />
                    <hr/>
                    <Button variant={"outline-dark"} onClick={addInfo} className={"mb-2"}>Додати нову властивість
                    </Button>
                    {info.map(i =>
                    <Row key={i.number}>
                        <Col md={4}>
                            <Form.Control
                                placeholder={"Введіть назву властивості"}
                                value={i.title}
                                onChange={(e) =>
                                    changeInfo('title', e.target.value, i.number)}
                            />
                        </Col>
                        <Col md={4}>
                            <Form.Control
                                placeholder={"Введіть опис властивості"}
                                value={i.description}
                                onChange={(e) =>
                                    changeInfo('description', e.target.value, i.number)}
                            />
                        </Col>
                        <Col md={4}>
                            <Button variant={"outline-danger"} className={"mt-2"} onClick={() => removeInfo(i.number)}>
                                Видалити
                            </Button>
                        </Col>
                    </Row>
                    )}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"outline-success"} onClick={addDevice}>Додати</Button>
                <Button variant={"outline-danger"} onClick={onHide}>Закрити</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreateDevice;