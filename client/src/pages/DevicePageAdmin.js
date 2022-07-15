import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {getOneDevice} from "../http/deviceApi";
import {Alert, Button, Col, Container, Row} from "react-bootstrap";
import ImageDevice from "../components/devices/imageDevices/ImageDevice";
import ChangeAllDevice from "../modal/changeDevice/ChangeAllDevice";
import useAuth from "../hook/useAuth";
import ChangeDeleteInfoDevice from "../modal/changeDevice/ChangeDeleteInfoDevice";
import AddInfoDevice from "../modal/changeDevice/AddInfoDevice";
import CommentDevice from "../components/comment/CommentDevice";
import {getRatingDeviceId} from "../http/ratingApi";

const DevicePageAdmin = () => {
    const {types, brands} = useAuth();
    const [device, setDevice] = useState({info: [], imageDeviceAws: [],});
    const [image, setImage] = useState([]);
    const [changeAllDevice, setChangeAllDevice] = useState(false);
    const [changeInfoDevice, setChangeInfoDevice] = useState(false);
    const [addInfoDevice, setAddInfoDevice] = useState(false);
    const [noInfo, setNoInfo] = useState(false);
    const [noComment, setNoComment] = useState(false);
    const [comment, setComment] = useState([]);
    const [error, setError] = useState('');
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
                if (data.info.length > 0){
                    setNoInfo(true);
                }
            }).catch(err => {
                if (err.response) {
                    setError(err.response.data.message);
                }
            });
            getRatingDeviceId(id).then(data => {
                if (data) {
                    setComment(data);
                    setError('');
                }
                if (data.length === 0){
                    setNoComment(true);
                }
                if (data.length > 0){
                    setNoComment(false);
                }
            }).catch(err => {
                if (err.response) {
                    setError(err.response.data.message);
                }
            });
            if (statusResponse){
                setStatusResponse(false);
            }
        } catch (e) {
            setError(e.message);
        }
    },[id, statusResponse, noInfo]);
    return (
        <Container className={"mt-3"}>
            {error && <Alert variant={'danger'} style={{textAlign: 'center', fontSize: '20px'}}>{error}</Alert>}
            <Row>
                <Col md={5}>
                    <div style={{margin: '10px 0 0 10px'}}>
                        <ImageDevice image={image}/>
                    </div>
                </Col>
                <Col md={3}>
                </Col>
                <Col md={4}>
                    <Row className={'devicePageAdmin_row_3'}>
                        <Button
                            variant={"outline-warning"}
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
                            {noInfo && <Button
                                variant={"outline-warning"}
                                onClick={() => setChangeInfoDevice(true)}
                            >
                                Змінити додаткові поля в пристрої
                            </Button>}
                             <ChangeDeleteInfoDevice
                                info={device.info}
                                show={changeInfoDevice}
                                onHide={() => setChangeInfoDevice(false)}
                                setStatusResponse={setStatusResponse}
                            />
                        </Row>
                    <Row className={'devicePageAdmin_row_3'}>
                        <Button
                            variant={"outline-primary"}
                            onClick={() => setAddInfoDevice(true)}
                        >
                            Додати додаткові поля в пристрої
                        </Button>
                        <AddInfoDevice
                            show={addInfoDevice}
                            onHide={() => setAddInfoDevice(false)}
                            id={id}
                            setStatusResponse={setStatusResponse}
                        />
                    </Row>
                </Col>
            </Row>
            <Row>
                <Col md={5}>
                    <h3 style={{margin: '10px'}}>Властивості:</h3>
                    <Row className={'devicePageAdmin_row_1'}>Тип: {type}</Row>
                    <Row className={'devicePageAdmin_row_2'}>Бренд: {brand}</Row>
                    <Row className={'devicePageAdmin_row_1'}>Модель: {device.name}</Row>
                    <Row className={'devicePageAdmin_row_2'}>Колір: {device.color}</Row>
                    <Row className={'devicePageAdmin_row_1'}>Ширина: {device.width} см</Row>
                    <Row className={'devicePageAdmin_row_2'}>Висота: {device.height} см</Row>
                    <Row className={'devicePageAdmin_row_1'}>Глубина: {device.depth} см</Row>
                    <Row className={'devicePageAdmin_row_2'}>Вартість: {device.price} грн.</Row>
                    {device.info.map((info, index) =>
                        <Row key={info.id}
                             className={index % 2 === 0 ? 'devicePageAdmin_row_1' : 'devicePageAdmin_row_2'}
                        >
                            {info.title}: {info.description}
                        </Row>
                    )}
                </Col>
                <Col md={2}>

                </Col>
                <Col md={5}>
                    <div className={'devicePage_main_div_comments'}>
                        {noComment ?
                            <div className={'devicePage_div_text_noComment'}>
                                У цього пристрою відсутні коментарі
                            </div>
                            :
                            <div>
                                <h3>Коментарі:</h3>
                                {comment && comment.map((c, index) =>
                                    <CommentDevice
                                        key={index}
                                        comment={c.comment}
                                        rate={c.rate}
                                        userName={c.userName}
                                        id={c.id}
                                        deviceId={id}
                                        setStatusResponse={setStatusResponse}
                                        setError={setError}
                                    />
                                )}
                            </div>
                        }
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default DevicePageAdmin;