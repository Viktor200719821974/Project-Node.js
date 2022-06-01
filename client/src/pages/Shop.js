import React, {useContext, useEffect, useState} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import TypeBar from "../components/TypeBar";
import BrandBar from "../components/BrandBar";
import DeviceList from "../components/DeviceList";
import {Context} from "../index";
import {fetchBrands, fetchDevices, fetchTypes} from "../http/deviceApi";
import {fetchImageDevice} from "../http/imageDeviceApi";
import {observer} from "mobx-react-lite";

const Shop = observer(() => {
    const {device} = useContext(Context);
    // const {user} = useContext(Context);
    // eslint-disable-next-line no-empty-pattern
    const [] = useState();
    const [image, setImage] = useState([]);
    useEffect(() => {
        fetchTypes().then(data => device.setTypes(data));
        fetchBrands().then(data => device.setBrands(data));
        fetchDevices().then(data => device.setDevices(data));
        fetchImageDevice().then(data => setImage(data));
    },[]);
    return (
        <Container>
          <Row className={"mt-2"}>
              <Col md={3}>
                <TypeBar/>
              </Col>
              <Col md={9}>
                <BrandBar/>
                  <DeviceList image={image}/>
              </Col>
          </Row>
        </Container>
    );
});

export default Shop;