import React, { useEffect, useState} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import TypeBar from '../components/types/TypeBar';
import BrandBar from "../components/brands/BrandBar";
import DeviceList from "../components/devices/DeviceList";
import {getDevices} from "../http/deviceApi";
import {getImageDevice} from "../http/imageDeviceApi";
import {observer} from "mobx-react-lite";
import useAuth from "../hook/useAuth";
import {getTypes} from "../http/typeApi";
import {getBrands} from "../http/brandApi";

const Shop = observer(() => {
    const {setTypes, setBrands, setDevices, selectedBrand, selectedType} = useAuth();
    const [image, setImage] = useState([]);

    useEffect (() => {
        getTypes().then(data => setTypes(data));
        getBrands().then(data => setBrands(data));
        getDevices(selectedBrand, selectedType).then(data => setDevices(data));
        getImageDevice().then(data => setImage(data));
    },[selectedBrand, selectedType]);

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