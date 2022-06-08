import React, {useEffect, useState} from 'react';
import {Alert, Button, Col, Dropdown, Form, Modal, Row} from "react-bootstrap";
import {addImageDevice, createDevice, fetchBrands, fetchTypes} from "../http/deviceApi";
import {observer} from "mobx-react-lite";
import useAuth from "../hook/useAuth";

const CreateDevice = observer(({show, onHide}) => {
    const {types, brands} = useAuth();
    const device = useAuth();
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [file, setFile] = useState([]);
    const [info, setInfo] = useState([]);
    const [selectedBrand, setSelectedBrand] = useState('');
    const [selectedType, setSelectedType] = useState('');
    const [isAuth, setIsAuth] = useState(false);
    const [deviceId, setDeviceId] = useState();
    const [loadedImage, setLoadedImage] = useState(false);
    const [statusResponse, setStatusResponse] = useState(false);

    useEffect(() => {
        fetchTypes().then(data => device.setTypes(data));
        fetchBrands().then(data => device.setBrands(data));
    }, []);

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
        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('price', `${price}`);
            formData.append('brandId', selectedBrand.id);
            formData.append('typeId', selectedType.id);
            formData.append('info', JSON.stringify(info));
            createDevice(formData).then(data => Promise.resolve(data).then(function (data) {
                if (data.name) {
                    setIsAuth(true);
                    setStatusResponse(true);
                    setDeviceId(data.id);
                }
            }));
        }catch (e) {
            console.log(e.message);
        }
    }

    const addImage = async () => {
        try{
            const formImage = new FormData();
            formImage.append('image', file);
            addImageDevice(deviceId, formImage).then(res => Promise.resolve(res).then(function (res) {
                if (res.imageLocation) {
                    setLoadedImage(true);
                    setStatusResponse(false);
                }
            }));
        }catch (e) {
            console.log(e.message);
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
                    Додати новий пристрій
                </Modal.Title>
            </Modal.Header>
            {/*{(statusResponse || loadedImage) && <Alert variant={'success'}>*/}
            {/*    {statusResponse ? '* Пристрій був добавлений!!!' : '* Фото було добавлено!!!'}*/}
            {/*</Alert>}*/}
            {(statusResponse || loadedImage) && <div className={'createDevice_div_successfully'}>
                {statusResponse ? '* Пристрій був добавлений!!!' : '* Фото було добавлено!!!'}
            </div>}
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
                    { isAuth &&
                        <div className={'createDevice_div_addImage'}>
                         <Form.Control
                        className={"mt-3"}
                        type={"file"}
                        onChange={selectFile}
                    />
                        <Button
                            variant={"outline-success"}
                            onClick={addImage}
                            className={'createDevice_button_addImage'}>
                            Додати фото
                    </Button>
                    </div>
                    }

                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"outline-success"} onClick={addDevice} style={{marginTop: 2}}>Додати</Button>
                <Button variant={"outline-danger"} onClick={onHide}>Закрити</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreateDevice;