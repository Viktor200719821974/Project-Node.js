import React from 'react';
import {Card, Col, Image} from "react-bootstrap";
import star from "../../image/Star 1.png";
import {useHistory} from "react-router-dom";
import {DEVICE_ROUTE} from "../../utils/constans";

const DeviceItem = ({device, image, type, brand}) => {
    const history = useHistory();
    const img = image.map(c => c.imageLocation);
    return (
        <Col md={3} className={"mt-3"} onClick={() => history.push(DEVICE_ROUTE + '/' + device.id)}>
            <Card style={{width: 202, cursor: 'pointer'}} border={"dark"}>
                <Image width={200} height={250} src={img[0]}/>
                <div className="text-black-50 mt-1 d-flex justify-content-between align-items-center">
                    <div>{type} {brand}</div>
                    <div className="d-flex align-items-center">
                        <div>{device.rating}</div>
                        <Image src={star} style={{width:18, height:18}}/>
                    </div>
                </div>
                <div>{device.name}</div>
            </Card>
        </Col>
    );
};

export default DeviceItem;