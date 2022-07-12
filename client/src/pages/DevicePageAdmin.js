import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {getOneDevice} from "../http/deviceApi";
import {Button, Col, Container, Row} from "react-bootstrap";
import ImageDevice from "../components/devices/imageDevices/ImageDevice";
import ChangeAllDevice from "../modal/ChangeAllDevice";
import useAuth from "../hook/useAuth";

const DevicePageAdmin = () => {
    const {types, brands} = useAuth();
    const [device, setDevice] = useState({info: [], imageDeviceAws: [],});
    const [image, setImage] = useState([]);
    const [changeAllDevice, setChangeAllDevice] = useState(false);
    const [changeDevice, setChangeDevice] = useState(false);
    // const [sendRating, setSendRating] = useState(0);
    // const [comment, setComment] = useState('');
    // const [error, setError] = useState('');
    const [statusResponse, setStatusResponse] = useState(false);
    const {id} = useParams();
    const type = types.filter(c => c.id === device.typeId).map(c => c.name);
    const brand = brands.filter(c => c.id === device.brandId).map(c => c.name);

    useEffect(() => {
        try {
            getOneDevice(id).then(data => {
                if (data) {
                    setDevice(data);
                    setImage(data.imageDeviceAws);
                }
            });
            if (statusResponse){
                setStatusResponse(false);
            }
        } catch (e) {
            console.log(e.message);
        }
    },[id, statusResponse]);
    return (
        <Container className={"mt-3"}>
            {/*{error && <Alert variant={'danger'} style={{textAlign: 'center', fontSize: '20px'}}>{error}</Alert>}*/}
            <Row>
                <Col md={5}>
                    <div style={{marginTop: '10px'}}>
                        <ImageDevice image={image}/>
                    </div>
                </Col>
                <Col md={3}>
                    {/*<h3>Властивості:</h3>*/}
                    {/*    <Row className={'devicePageAdmin_row_1'}>Тип: {type}</Row>*/}
                    {/*    <Row className={'devicePageAdmin_row_2'}>Бренд: {brand}</Row>*/}
                    {/*    <Row className={'devicePageAdmin_row_1'}>Модель: {device.name}</Row>*/}
                    {/*    <Row className={'devicePageAdmin_row_2'}>Колір: {device.color}</Row>*/}
                    {/*    <Row className={'devicePageAdmin_row_1'}>Ширина: {device.width} см</Row>*/}
                    {/*    <Row className={'devicePageAdmin_row_2'}>Висота: {device.height} см</Row>*/}
                    {/*    <Row className={'devicePageAdmin_row_1'}>Глубина: {device.depth} см</Row>*/}
                    {/*    <Row className={'devicePageAdmin_row_2'}>Вартість: {device.price} грн.</Row>*/}
                        {device.info.map((info, index) =>
                            <Row key={info.id}
                                 style={{background: index % 2 === 0 ? 'lightgray' : 'transparent', padding: 10}}
                            >
                                {info.title}: {info.description}
                            </Row>
                        )}
                </Col>
                <Col md={4}>
                    <Row className={'devicePageAdmin_row_3'}>
                        <Button
                            variant={"outline-primary"}
                            onClick={() => setChangeAllDevice(true)}
                        >
                            Змінити все або щось одне в пристрої
                        </Button>
                        <ChangeAllDevice
                        show={changeAllDevice}
                        onHide={() => setChangeAllDevice(false)}
                        id={id}
                        device={device}
                        setStatusResponse={setStatusResponse}
                        />
                    </Row>
                        <Row className={'devicePageAdmin_row_3'}>
                            <Button
                                variant={"outline-primary"}
                                onClick={() => setChangeDevice(true)}
                            >
                                Змінити  в пристрої
                            </Button>
                        </Row>
                </Col>
            </Row>
            <Row className={'devicePageAdmin_row_1'}>Тип: {type}</Row>
            <Row className={'devicePageAdmin_row_2'}>Бренд: {brand}</Row>
            <Row className={'devicePageAdmin_row_1'}>Модель: {device.name}</Row>
            <Row className={'devicePageAdmin_row_2'}>Колір: {device.color}</Row>
            <Row className={'devicePageAdmin_row_1'}>Ширина: {device.width} см</Row>
            <Row className={'devicePageAdmin_row_2'}>Висота: {device.height} см</Row>
            <Row className={'devicePageAdmin_row_1'}>Глубина: {device.depth} см</Row>
            <Row className={'devicePageAdmin_row_2'}>Вартість: {device.price} грн.</Row>
        </Container>
    );
};

export default DevicePageAdmin;