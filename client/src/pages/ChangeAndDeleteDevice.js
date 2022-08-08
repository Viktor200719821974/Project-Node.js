import React, {useEffect, useState} from 'react';
import {Col, Container, Form, Row} from "react-bootstrap";
import Pagination from "react-bootstrap/Pagination";
import PaginationDevice from "../components/Pagination";
import useAuth from "../hook/useAuth";
import {getImageDevice} from "../http/imageDeviceApi";
import DeviceCardAdmin from "../components/devices/DeviceCardAdmin";
import {getDevices} from "../http/deviceApi";

const ChangeAndDeleteDevice =() => {
    const {devices, types, brands, setDevices} = useAuth();
    const [image, setImage] = useState([]);
    const [page, setPage] = useState(1);
    const [countPage, setCountPage] = useState();
    const [name, setName] = useState('');
    const [statusResponse, setStatusResponse] = useState(false);

    let numberPage = [];
    for (let i = 1; i <= countPage; i++ ){
        Number(i);
        numberPage.push(i);
    }
    useEffect(() => {
        try {
            getImageDevice().then(data => setImage(data))
                .catch(err => {
                if (err.response) {
                    alert(err.response.data.message);
                }
            });

            getDevices(page, name).then(data => {
                setDevices(data);
                if (data.count && data.perPage){
                    Number(data.count);
                    Number(data.perPage);
                    setCountPage(Math.ceil(data.count/ data.perPage));
                }
                if (countPage && countPage < page){
                    setPage(1);
                }
                if (data.count === 0) {
                    setCountPage(0);
                }
            }).catch(err => {
                    if (err.response) {
                        alert(err.response.data.message);
                    }
                });
            if (statusResponse) {
                setStatusResponse(false);
            }
        } catch (e) {
            alert(e.message);
        }
        // eslint-disable-next-line
    }, [page, countPage, statusResponse, name]);
    return (
            <Container className={'shop_container'}>
                <Row className={"mt-2"}>
                    <Col md={3}>
                        <Form className={'d-flex p-2'}>
                        <Form.Control
                            type="text"
                            placeholder={"Введіть модель..."}
                            onChange={(e) => setName(e.target.value)}/>
                        </Form>
                    </Col>
                    {devices.rows.length === 0
                        ?
                        <div style={{fontSize: '36px', display: 'flex', justifyContent: 'center', color: 'blue'}}>Not Found</div>
                        :
                    <Col md={9}>
                        <Row className={"d-flex"}>
                        { devices && devices.rows.map((device) =>
                            <DeviceCardAdmin
                                key={device.id}
                                device={device}
                                image={image.filter(c => c.deviceId === device.id)}
                                type={types.filter(c => c.id === device.typeId).map(c => c.name)}
                                brand={brands.filter(c => c.id === device.brandId).map(c => c.name)}
                                rating={device.rating?.averageRating}
                                setStatusResponse={setStatusResponse}
                            />
                        )}
                        </Row>
                    </Col>
                    }
                    {
                        countPage > 1 && <div className={'shop_div_paginationDevice'}>
                            <Pagination>
                                {page !== 1 && <Pagination.First onClick={() => {
                                    setPage(1)
                                }}/>}
                                {page !== 1 && <Pagination.Prev onClick={() => {
                                    setPage(page - 1)
                                }}/>}
                                {numberPage && numberPage.map((c, index) => <PaginationDevice key={index} item={c} setPage={setPage}
                                                                                page={page}/>)}
                                {countPage !== page && <Pagination.Next onClick={() => {
                                    setPage(page + 1)
                                }}/>}
                                {countPage !== page && <Pagination.Last onClick={() => {
                                    setPage(countPage)
                                }}/>}
                            </Pagination>
                        </div>
                    }
                </Row>
            </Container>
    );
};

export default ChangeAndDeleteDevice;