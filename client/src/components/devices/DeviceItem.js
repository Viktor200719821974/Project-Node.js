import React from 'react';
import {Card, Col, Image} from "react-bootstrap";
import star from "../../image/Star 1.png";
import {useHistory} from "react-router-dom";
import {DEVICE_ROUTE} from "../../utils/constans";
import noImage from '../../image/no_image.jpg';

const DeviceItem = ({device, image, type, brand, rating}) => {
    const history = useHistory();
    const img = image.map(c => c.imageLocation);
    return (
        <Col md={3} className={"mt-3"} onClick={() => history.push(DEVICE_ROUTE + '/' + device.id)}>
            <Card style={{width: 202, cursor: 'pointer'}} border={"dark"}>
                <Image width={200} height={200} style={{objectFit: 'contain'}} src={img[0] || noImage}/>
                <div className="text-black-50 mt-1 d-flex justify-content-between align-items-center">
                    <div className={'deviceItem_div'}>{type} {brand}</div>
                    <div className="d-flex align-items-center">
                        <div>{rating}</div>
                        <Image src={star} style={{width:18, height:18}}/>
                    </div>
                </div>
                <div className={'deviceItem_div'}>Модель: {device.name}</div>
            </Card>
        </Col>
    );
};

export default DeviceItem;