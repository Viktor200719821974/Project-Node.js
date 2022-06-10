import React, {useEffect, useState} from 'react';
import {Button, Card, Col, Container, Row} from "react-bootstrap";
import star from "../image/Star 1.png";
import {getOneDevice} from "../http/deviceApi";
import {useParams} from "react-router-dom";
import ImageDevice from "../components/devices/imageDevices/ImageDevice";

const DevicePage = () => {
    const [device, setDevice] = useState({info: [], imageDeviceAws: [],});
    const [image, setImage] = useState([])
    const {id} = useParams();
    useEffect(() => {
        getOneDevice(id).then(data => {
            setDevice(data);
            setImage(data.imageDeviceAws);
        });
    },[]);
    return (
        <Container className={"mt-3"}>
            <Row>
                <Col md={4}>
                    {
                        image && image.map(c => <ImageDevice key={c.id} image={c.imageLocation}/>)
                    }
                </Col>
                <Col md={4}>
                    <Row className={"d-flex flex-column align-items-center"}>
                        <h2>{device.name}</h2>
                        <div
                            className={"d-flex align-items-center justify-content-center"}
                            style={{background: `url(${star}) no-repeat center center`, width: 300, height: 240,
                                backgroundSize: "cover", fontSize: 64}}
                        >
                            {device.rating}
                        </div>
                    </Row>
                </Col>
                <Col md={4}>
                    <Card className={"d-flex flex-column align-items-center justify-content-around"}
                          style={{width: 300, height: 300, fontSize: 32, border: "5px solid lightgray"}}
                    >
                        <h3>Від {device.price} грн.</h3>
                        <Button variant={"outline-dark"}>Додати в корзину</Button>
                    </Card>
                </Col>
            </Row>
            <Row className={"d-flex flex-column m-3"}>
                <h1>Властивості</h1>
                {device.info.map((info, index) =>
                    <Row key={info.id}
                         style={{background: index % 2 === 0 ? 'lightgray' : 'transparent', padding: 10}}
                    >
                        {info.title}: {info.description}
                    </Row>
                )}
            </Row>
        </Container>
    );
};

export default DevicePage;