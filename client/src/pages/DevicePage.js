import React, {useEffect, useState} from 'react';
import {Button, Card, Col, Container, Row} from "react-bootstrap";
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
    const {id} = useParams();
    const {setBasket, isLogin} = useAuth();

    const addBasket = () => {
        createBasketDevice(device.id).then(data => setBasket(data));
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
    },[id]);
    return (
        <Container className={"mt-3"}>
            <Row>
                <Col md={5}>
                        <ImageDevice image={image}/>
                </Col>
                <Col md={4}>
                    <Row className={"d-flex flex-column align-items-center"}>
                        {/*<h1>Властивості</h1>*/}
                        <h4>Модель: {device.name}</h4>
                        <h4>Модель: {device.name}</h4>
                        <h4>Модель: {device.name}</h4>
                        <h4>Модель: {device.name}</h4>
                        <h4>Модель: {device.name}</h4>
                        <h4>Модель: {device.name}</h4>
                        <h4>Модель: {device.name}</h4>
                        <h4>Модель: {device.name}</h4>
                        <h4>Модель: {device.name}</h4>
                        <h4>Модель: {device.name}</h4>
                        <h4>Модель: {device.name}</h4>
                        {device.info.map((info, index) =>
                            <Row key={info.id}
                                 style={{background: index % 2 === 0 ? 'lightgray' : 'transparent', padding: 10}}
                            >
                                {info.title}: {info.description}
                            </Row>
                        )}
                    </Row>
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