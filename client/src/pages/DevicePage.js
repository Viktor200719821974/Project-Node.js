import React, {useEffect, useState} from 'react';
import {Alert, Button, Card, Col, Container, Row} from "react-bootstrap";
import {getOneDevice} from "../http/deviceApi";
import {useParams} from "react-router-dom";
import ImageDevice from "../components/devices/imageDevices/ImageDevice";
import {createBasketDevice} from "../http/basketApi";
import useAuth from "../hook/useAuth";
import {FaStar} from "react-icons/fa";
import RatingDevice from "../components/devices/RatingDevice";
import {createRatingDeviceId, getRatingDeviceId} from "../http/ratingApi";
import {observer} from "mobx-react-lite";
import CommentDevice from "../components/comment/CommentDevice";

const DevicePage = observer(() => {
    const [device, setDevice] = useState({info: [], imageDeviceAws: [],});
    const [image, setImage] = useState([]);
    const [rating, setRating] = useState([]);
    const [noComment, setNoComment] = useState(false);
    const [comment, setComment] = useState([]);
    const [sendRating, setSendRating] = useState(0);
    const [sendComment, setSendComment] = useState('');
    const [error, setError] = useState('');
    const [statusResponse, setStatusResponse] = useState(false);
    const {id} = useParams();
    const {setBasket, isLogin, types, brands} = useAuth();
    const type = types.filter(c => c.id === device.typeId).map(c => c.name);
    const brand = brands.filter(c => c.id === device.brandId).map(c => c.name);

    const addBasket = () => {
        try{
            createBasketDevice(device.id).then(data => {
                setBasket(data);
                setError('');
            })
                .catch(err => {
                    if (err.response.status === 404){
                        setError(err.response.data.message);
                    }
                });
        }catch (e) {
            setError(e.message);
        }
    }
    const funcComment = () => {
        try {
            const formData = new FormData();
            formData.append('comment', sendComment);
            formData.append('rate', `${sendRating}`);
            formData.append('deviceId', id);
            createRatingDeviceId(formData).then(data => {
                if (data.id) {
                    setSendComment('');
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
            setError(e.message);
        }
    }
    useEffect(() => {
        try {
            getOneDevice(id).then(data => {
                if (data) {
                    setDevice(data);
                    setImage(data.imageDeviceAws);
                    setRating(data.rating);
                    setError('');
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
            }).catch(err => {
                if (err.response) {
                    setError(err.response.data.message);
                }
            });
        } catch (e) {
            setError(e.message);
        }
    },[]);
    return (
        <Container className={"mt-3"}>
            {statusResponse && <Alert variant={'success'} style={{textAlign: 'center', fontSize: '20px'}}>
                 Дякуємо за Ваш відгук!!!
            </Alert>}
            {error && <Alert variant={'danger'} style={{textAlign: 'center', fontSize: '20px'}}>{error}</Alert>}
            <Row>
                <Col md={5} style={{marginLeft: '10px'}}>
                        <ImageDevice image={image}/>
                </Col>
                <Col md={3}>
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
                    <Row className={"d-flex flex-column m-3"}></Row>
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
                            <div>У цього пристрою відсутні коментарі</div>
                            :
                            <div>
                                <h3>Коментарі:</h3>
                                {comment && comment.map((c, index) =>
                                    <CommentDevice
                                        key={index}
                                        comment={c.comment}
                                        rate={c.rate}
                                    />
                                )}
                            </div>
                        }
                    </div>
                    <div className={'devicePage_div_sendComment'}>
                    {
                        isLogin && <form className={'form_register'}>
                            <legend>Залишити коментар:</legend>
                            <label htmlFor={'comments'}>
                                <textarea
                                    name="comments"
                                    id="text_box"
                                    cols="50"
                                    rows="4"
                                    value={sendComment}
                                    onChange={e => setSendComment(e.target.value)}/>
                            </label>
                            <br/>
                            <label htmlFor="rating" style={{marginRight: '20px'}}>
                                Поставте оцінку
                                <RatingDevice sendRating={sendRating} setSendRating={setSendRating}/>
                            </label>
                            <Button variant={"outline-primary"} onClick={funcComment}>Відправити</Button>
                        </form>}
                    </div>
                </Col>
            </Row>
        </Container>
    );
});

export default DevicePage;