import React, {useEffect, useState} from 'react';
import {Button, Card, Col, Container, Row} from "react-bootstrap";
// import star from "../image/Star 1.png";
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
    const [sendRating, setSendRating] = useState([]);
    const [comment, setComment] = useState('');
    const {id} = useParams();
    const {setBasket, isLogin} = useAuth();

    const addBasket = () => {
        createBasketDevice(device.id).then(data => setBasket(data));
    }
    const sendComment = () => {
        const formData = new FormData();
        // formData.append('comment', comment);
        formData.append('rate', sendRating);
        formData.append('deviceId', id);
        createRatingDeviceId(formData).then(data => console.log(data));
    }
    useEffect(() => {
        getOneDevice(id).then(data => {
            setDevice(data);
            setImage(data.imageDeviceAws);
            setRating(data.rating);
        });
    },[rating]);
    return (
        <Container className={"mt-3"}>
            <Row>
                <Col md={5}>
                    {/*{*/}
                    {/*    image && image.map(c => <ImageDevice key={c.id} image={c.imageLocation}/>)*/}
                    {/*}*/}
                    <ImageDevice/>
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
                        {/*<h2>{device.name}</h2>*/}
                        {/*<div*/}
                        {/*    className={"d-flex align-items-center justify-content-center"}*/}
                        {/*    style={{background: `url(${star}) no-repeat center center`, width: 300, height: 240,*/}
                        {/*        backgroundSize: "cover", fontSize: 64}}*/}
                        {/*>*/}
                        {/*    {rating.averageRating}*/}
                        {/*</div>*/}
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
            <form className={'form_register'}>
                <legend>Коментар</legend>
                <label htmlFor={'comments'}>
                    <textarea name="comments" id="text_box" cols="50" rows="4" value={comment}
                              onChange={e => setComment(e.target.value)}/>
                </label>
                <br/>
                <label htmlFor="rating" style={{marginRight: '20px'}}>
                    Поставте оцінку
                    <RatingDevice sendRating={sendRating} setSendRating={setSendRating}/>
                    {/*<input*/}
                    {/*       name={'rating'}*/}
                    {/*       type="number" onChange={e =>*/}
                    {/*    setRating(e.target.value)} placeholder={'від 1 до 10'}/>*/}
                </label>
                <Button variant={"outline-primary"} onClick={sendComment}>Відправити</Button>
            </form>
        </Container>
    );
};

export default DevicePage;