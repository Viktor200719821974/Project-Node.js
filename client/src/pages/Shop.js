import React, { useEffect, useState} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import TypeBar from '../components/types/TypeBar';
import BrandBar from "../components/brands/BrandBar";
import DeviceList from "../components/devices/DeviceList";
import {fetchDevices} from "../http/deviceApi";
import {fetchImageDevice} from "../http/imageDeviceApi";
import {observer} from "mobx-react-lite";
import useAuth from "../hook/useAuth";
import {fetchTypes} from "../http/typeApi";
import {fetchBrands} from "../http/brandApi";

const Shop = observer(() => {
    const devices = useAuth();
    // eslint-disable-next-line no-empty-pattern
    const [] = useState([]);
    const [image, setImage] = useState([]);
    useEffect(() => {
        fetchTypes().then(data => devices.setTypes(data));
        fetchBrands().then(data => devices.setBrands(data));
        fetchDevices().then(data => devices.setDevices(data));
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