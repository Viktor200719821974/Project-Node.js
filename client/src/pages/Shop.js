import React, {useContext, useEffect, useState} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import TypeBar from "../components/TypeBar";
import BrandBar from "../components/BrandBar";
import DeviceList from "../components/DeviceList";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {fetchBrands, fetchDevices, fetchTypes} from "../http/deviceApi";

const Shop = observer(() => {
    const {device} = useContext((Context));
    const [] = useState();
    useEffect(() => {
        fetchTypes().then(data => device.setTypes(data));
        fetchBrands().then(data => device.setBrands(data));
        fetchDevices().then(data => device.setDevices(data));
    },[device]);
    return (
        <Container>
          <Row className={"mt-2"}>
              <Col md={3}>
                <TypeBar/>
              </Col>
              <Col md={9}>
                <BrandBar/>
                  <DeviceList/>
              </Col>
          </Row>
        </Container>
    );
});

export default Shop;