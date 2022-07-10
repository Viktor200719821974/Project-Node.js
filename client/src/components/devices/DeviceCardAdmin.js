import React from 'react';
import {Button, Card, Col, Image} from "react-bootstrap";
import noImage from "../../image/no_image.jpg";
import star from "../../image/Star 1.png";
import {MdOutlineDeleteForever} from "react-icons/md";

const DeviceCardAdmin = ({device, type, image, brand, rating}) => {
    const img = image.map(c => c.imageLocation);
    const del = () => {

    }
    return (
        <Col md={3} className={"mt-3"} onClick={() => ''}>
            <Card style={{width: 202, cursor: 'pointer'}} border={"dark"}>
                <Button variant={"outline-danger"}
                        onClick={del}><MdOutlineDeleteForever/>Видалити</Button>
                <Image width={200} height={250} src={img[0] || noImage}/>
                <div className="text-black-50 mt-1 d-flex justify-content-between align-items-center">
                    <div>{type} {brand}</div>
                    <div className="d-flex align-items-center">
                        <div>{rating}</div>
                        <Image src={star} style={{width:18, height:18}}/>
                    </div>
                </div>
                <div>{device.name}</div>
            </Card>
        </Col>
    );
};

export default DeviceCardAdmin;