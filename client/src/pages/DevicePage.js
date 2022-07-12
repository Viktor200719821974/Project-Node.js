import React, {useEffect, useState} from 'react';
import {Alert, Button, Card, Col, Container, Row} from "react-bootstrap";
import {getOneDevice} from "../http/deviceApi";
import {useParams} from "react-router-dom";
import ImageDevice from "../components/devices/imageDevices/ImageDevice";
import {createBasketDevice} from "../http/basketApi";
import useAuth from "../hook/useAuth";
import {FaStar} from "react-icons/fa";
import RatingDevice from "../components/devices/RatingDevice";
import {createRatingDeviceId} from "../http/ratingApi";

const DevicePage = () => {
    const [device, setDevice] = useState({info: [], imageDeviceAws: [],});
    const [image, setImage] = useState([]);
    const [rating, setRating] = useState([]);
    const [sendRating, setSendRating] = useState(0);
    const [comment, setComment] = useState('');
    const [error, setError] = useState('');
    const [statusResponse, setStatusResponse] = useState(false);
    const {id} = useParams();
    const {setBasket, isLogin, types, brands} = useAuth();
    const type = types.filter(c => c.id === device.typeId).map(c => c.name);
    const brand = brands.filter(c => c.id === device.brandId).map(c => c.name);

    const addBasket = () => {
        try{
            createBasketDevice(device.id).then(data => setBasket(data))
                .catch(err => {
                    if (err.response.status === 404){
                        setError(err.response.data.message);
                    }
                });
        }catch (e) {
            console.log(e.message);
        }
    }
    const sendComment = () => {
        try {
            const formData = new FormData();
            formData.append('comment', comment);
            formData.append('rate', sendRating);
            formData.append('deviceId', id);
            createRatingDeviceId(formData).then(data => {
                if (data.id) {
                    setComment('');
                    setSendRating(0);
                    setStatusResponse(true);
                    setError('');
                }
            }).catch(err => {
                if (err.response) {
                    setError(err.response.data.message);
                    setStatusResponse(false);
                }
            });
        } catch (e) {
            console.log(e.message);
        }
    }
    useEffect(() => {
        try {
            getOneDevice(id).then(data => {
                if (data) {
                    setDevice(data);
                    setImage(data.imageDeviceAws);
                    setRating(data.rating);
                }
            });
        } catch (e) {
            console.log(e.message);
        }
    },[id, rating]);
    return (
        <Container className={"mt-3"}>
            {statusResponse && <Alert variant={'success'} style={{textAlign: 'center', fontSize: '20px'}}>
                * Дякуємо за Ваш відгук!!!
            </Alert>}
            {error && <Alert variant={'danger'} style={{textAlign: 'center', fontSize: '20px'}}>{error}</Alert>}
            <Row>
                <Col md={5}>
                        <ImageDevice image={image}/>
                </Col>
                <Col md={4} >
                    {/*<Row className={'devicePageAdmin_row_1'}>Тип: {type}</Row>*/}
                    {/*<Row className={'devicePageAdmin_row_2'}>Бренд: {brand}</Row>*/}
                    {/*<Row className={'devicePageAdmin_row_1'}>Модель: {device.name}</Row>*/}
                    {/*<Row className={'devicePageAdmin_row_2'}>Колір: {device.color}</Row>*/}
                    {/*<Row className={'devicePageAdmin_row_1'}>Ширина: {device.width} см</Row>*/}
                    {/*<Row className={'devicePageAdmin_row_2'}>Висота: {device.height} см</Row>*/}
                    {/*<Row className={'devicePageAdmin_row_1'}>Глубина: {device.depth} см</Row>*/}
                    {/*<Row className={'devicePageAdmin_row_2'}>Вартість: {device.price} грн.</Row>*/}
                    {/*<Row className={"d-flex flex-column align-items-center"}>*/}
                    {/*    /!*<h1>Властивості</h1>*!/*/}
                    {/*    <h4>Модель: {device.name}</h4>*/}
                    {/*    <h4>Колір: {device.color}</h4>*/}
                    {/*    <h4>Ширина: {device.width} см</h4>*/}
                    {/*    <h4>Висота: {device.height} см</h4>*/}
                    {/*    <h4>Глубина: {device.depth} см</h4>*/}
                        {device.info.map((info, index) =>
                            <Row key={info.id}
                                 style={{background: index % 2 === 0 ? 'lightgray' : 'transparent', padding: 10}}
                            >
                                {info.title}: {info.description}
                            </Row>
                        )}
                    {/*</Row>*/}
                </Col>
                <Col md={3}>
                    <Card className={"d-flex flex-column align-items-center justify-content-around"}
                          style={{width: 300, height: 300, fontSize: 32, border: "5px solid lightgray"}}
                    >
                        <h3>Вартість: {device.price} грн.</h3>
                        <div>
                            {[...Array(5)].map((star, i) => {
                                const ratingValue = i + 1;
                                return (
                                    <FaStar
                                        size={30}
                                        key={i}
                                        color={ratingValue <= rating.averageRating ? '#ffc107' : '#e4e5e9'}
                                    />
                                );
                            })}
                        </div>
                        {
                            isLogin
                                ? <Button variant={"outline-dark"} onClick={addBasket}>Додати в корзину</Button>
                                : <div style={{fontSize: '12px'}}>Щоб додати продукт в корзину, авторизуйтесь </div>
                        }
                    </Card>
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
            <Row className={"d-flex flex-column m-3"}>
                {/*<h1>Властивості</h1>*/}
                {/*<h3>Модель: {device.name}</h3>*/}
                {/*{device.info.map((info, index) =>*/}
                {/*    <Row key={info.id}*/}
                {/*         style={{background: index % 2 === 0 ? 'lightgray' : 'transparent', padding: 10}}*/}
                {/*    >*/}
                {/*        {info.title}: {info.description}*/}
                {/*    </Row>*/}
                {/*)}*/}
            </Row>
            {
             isLogin && <form className={'form_register'}>
                <legend>Коментар</legend>
                <label htmlFor={'comments'}>
                    <textarea name="comments" id="text_box" cols="50" rows="4" value={comment}
                              onChange={e => setComment(e.target.value)}/>
                </label>
                <br/>
                <label htmlFor="rating" style={{marginRight: '20px'}}>
                    Поставте оцінку
                    <RatingDevice sendRating={sendRating} setSendRating={setSendRating}/>
                </label>
                <Button variant={"outline-primary"} onClick={sendComment}>Відправити</Button>
            </form>}
        </Container>
    );
};

export default DevicePage;