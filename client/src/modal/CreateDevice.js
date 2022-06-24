import React, {useEffect, useState} from 'react';
import {Button, Col, Dropdown, Form, Modal, Row, Alert} from "react-bootstrap";
import {createDevice} from "../http/deviceApi";
import {observer} from "mobx-react-lite";
import useAuth from "../hook/useAuth";
import {getTypes} from "../http/typeApi";
import {getBrands} from "../http/brandApi";
import {createImageDevice} from "../http/imageDeviceApi";

const CreateDevice = observer(({show, onHide}) => {
    const {types, brands} = useAuth();
    const device = useAuth();
    const [name, setName] = useState('');
    const [color, setColor] = useState('');
    const [width, setWidth] = useState('');
    const [height, setHeight] = useState('');
    const [depth, setDepth] = useState('');
    const [price, setPrice] = useState('');
    const [file, setFile] = useState([]);
    const [info, setInfo] = useState([]);
    const [selectedBrand, setSelectedBrand] = useState('');
    const [selectedType, setSelectedType] = useState('');
    const [isAuth, setIsAuth] = useState(false);
    const [deviceId, setDeviceId] = useState();
    const [loadedImage, setLoadedImage] = useState(false);
    const [statusResponse, setStatusResponse] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        try{
            getTypes().then(data => device.setTypes(data));
            getBrands().then(data => device.setBrands(data));
        }catch (e) {
            console.log(e.message);
        }
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

    const addDevice = async () => {
        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('color', color);
            formData.append('width', `${width}`);
            formData.append('height', `${height}`);
            formData.append('depth', `${depth}`);
            formData.append('price', `${price}`);
            formData.append('brandId', selectedBrand.id);
            formData.append('typeId', selectedType.id);
            formData.append('info', JSON.stringify(info));
            createDevice(formData).then(data => Promise.resolve(data).then(function (data) {
                if (data.name) {
                    setIsAuth(true);
                    setStatusResponse(true);
                    setDeviceId(data.id);
                    setError('');
                }
            })).catch(err => {
                if (err.response) {
                    setError(err.response.data.message);
                    setStatusResponse(false);
                }
            });
        }catch (e) {
            console.log(e);
        }
    }

    const addImage = async () => {
        try{
            const formImage = new FormData();
            formImage.append('image', file);
            createImageDevice(deviceId, formImage).then(res => Promise.resolve(res).then(function (res) {
                if (res.imageLocation) {
                    setLoadedImage(true);
                    setStatusResponse(false);
                }
            })).catch(err => {
                if (err.response) {
                    setError(err.response.data.message);
                    setStatusResponse(false);
                }
            });
        }catch (e) {
            console.log(e.message);
        }
    }
    const clear = () => {
        try{
            setName('');
            setColor('');
            setWidth('');
            setHeight('');
            setDepth('');
            setPrice('');
            setFile([]);
            setInfo([]);
            setSelectedBrand('');
            setSelectedType('');
            setLoadedImage(false);
            setStatusResponse(false);
            setIsAuth(false);
            setError('');
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
                    Додати новий пристрій
                </Modal.Title>
            </Modal.Header>
            {(statusResponse || loadedImage) && <Alert variant={'success'} style={{textAlign: 'center', fontSize: '20px'}}>
                {statusResponse ? '* Пристрій був добавлений!!!' : 'Фото було добавлено!!!'}
            </Alert>}
            {error && <Alert variant={'danger'} style={{textAlign: 'center', fontSize: '20px'}}>{error}</Alert>}
            {/*{(statusResponse || loadedImage) && <div className={'createDevice_div_successfully'}>*/}
            {/*    {statusResponse ? '* Пристрій був добавлений!!!' : '* Фото було добавлено!!!'}*/}
            {/*</div>}*/}
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
                        placeholder={"Введіть колір пристрою"}
                        className={"mt-3"}
                        value={color}
                        onChange={e => setColor(e.target.value)}
                    />
                    <Form.Control
                        placeholder={"Введіть ширину пристрою"}
                        className={"mt-3"}
                        type={"number"}
                        value={width}
                        onChange={e => setWidth(e.target.value)}
                    />
                    <Form.Control
                        placeholder={"Введіть висоту пристрою"}
                        className={"mt-3"}
                        type={"number"}
                        value={height}
                        onChange={e => setHeight(e.target.value)}
                    />
                    <Form.Control
                        placeholder={"Введіть глубину пристрою"}
                        className={"mt-3"}
                        type={"number"}
                        value={depth}
                        onChange={e => setDepth(e.target.value)}
                    />
                    <Form.Control
                        placeholder={"Введіть вартість пристрою"}
                        className={"mt-3"}
                        type={"number"}
                        value={price}
                        onChange={e => setPrice(e.target.value)}
                    />
                    <hr/>
                    <Button variant={"outline-dark"} onClick={addInfo} className={"mb-2"}>Додати нову властивість
                    </Button>
                    {info && info.map(i =>
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
                <Button variant={"outline-warning"} onClick={clear} style={{marginTop: 2}}>Очистити</Button>
                <Button variant={"outline-danger"} onClick={onHide}>Закрити</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreateDevice;