import React from 'react';
import {Card, Col, Image} from "react-bootstrap";
import star from "../../image/Star 1.png";
import {useHistory} from "react-router-dom";
import {DEVICE_ROUTE} from "../../utils/constans";
// import ImageCard from "./imageDevices/ImageCard";

const DeviceItem = ({device, image}) => {
    const history = useHistory();
    const img = image.map(c => c.imageLocation);
    // console.log(img);
    return (
        <Col md={3} className={"mt-3"} onClick={() => history.push(DEVICE_ROUTE + '/' + device.id)}>
            <Card style={{width: 150, cursor: 'pointer'}} border={"light"}>
                {/*{image.map((c, index) => <ImageCard image={c.imageLocation} key={index}/>)}*/}
                {/*<Image width={150} height={150} src={img[0]}/>*/}
                <div className="text-black-50 mt-1 d-flex justify-content-between align-items-center">
                    <div>Samsung...</div>
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