import React, { useEffect, useState} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import TypeBar from '../components/types/TypeBar';
import BrandBar from "../components/brands/BrandBar";
import DeviceList from "../components/devices/DeviceList";
import {fetchBrands, fetchDevices, fetchTypes} from "../http/deviceApi";
// import {fetchImageDevice} from "../http/imageDeviceApi";
import {observer} from "mobx-react-lite";
import useAuth from "../hook/useAuth";

const Shop = observer(() => {
    const devices = useAuth();
    // eslint-disable-next-line no-empty-pattern
    const [] = useState([]);
    // const [image, setImage] = useState([]);
    useEffect(() => {
        fetchTypes().then(data => devices.setTypes(data));
        fetchBrands().then(data => devices.setBrands(data));
        fetchDevices().then(data => devices.setDevices(data));
        // fetchImageDevice().then(data => setImage(data));
    },[]);
    return (
        <Container>
          <Row className={"mt-2"}>
              <Col md={3}>
                <TypeBar/>
              </Col>
              <Col md={9}>
                <BrandBar/>
                  <DeviceList image={'https://static.remove.bg/remove-bg-web/035676ee65d6ce9f128769532ffdff315f3005c7/' +
                      'assets/start-1abfb4fe2980eabfbbaaa4365a0692539f7cd2725f324f904565a9a744f8e214.jpg'}/>
              </Col>
          </Row>
        </Container>
    );
});

export default Shop;