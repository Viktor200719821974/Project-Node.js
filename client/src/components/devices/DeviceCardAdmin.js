import React from 'react';
import {useHistory} from "react-router-dom";
import {Button, Card, Col, Image} from "react-bootstrap";
import noImage from "../../image/no_image.jpg";
import star from "../../image/Star 1.png";
import {MdOutlineDeleteForever} from "react-icons/md";
import {deleteDevice} from "../../http/deviceApi";
import {DEVICE_CARD_ADMIN_ROUTE} from "../../utils/constans";

const DeviceCardAdmin = ({device, type, image, brand, rating, setStatusResponse}) => {
    const history = useHistory();
    const img = image.map(c => c.imageLocation);
    const del = () => {
        deleteDevice(device.id).then(data => {
            if (data === 'Ok'){
                setStatusResponse(true);
            }
        }).catch(err => {
            if (err.response) {
                alert(err.response.data.message);
            }
        });
    }
    return (
        <Col md={3} className={"mt-3"} >
            <Card style={{width: 202, cursor: 'pointer'}} border={"dark"}>
                <Button variant={"outline-danger"}
                        onClick={del}><MdOutlineDeleteForever size={'25px'}/>Видалити</Button>
                <div onClick={() => history.push(DEVICE_CARD_ADMIN_ROUTE + '/' + device.id)}>
                    <Image width={200} height={250} src={img[0] || noImage}/>
                    <div className="text-black-50 mt-1 d-flex justify-content-between align-items-center">
                        <div className={'deviceItem_div'}>{type} {brand}</div>
                        <div className="d-flex align-items-center">
                            <div>{rating}</div>
                            <Image src={star} style={{width:18, height:18}}/>
                        </div>
                    </div>
                    <div className={'deviceItem_div'}>Модель: {device.name}</div>
                </div>
            </Card>
        </Col>
    );
};

export default DeviceCardAdmin;