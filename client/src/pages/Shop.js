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
import PaginationDevice from "../components/Pagination";
import Pagination from 'react-bootstrap/Pagination';

const Shop = observer(() => {
    const {setTypes, setBrands, setDevices, selectedBrand, selectedType, devices} = useAuth();
    const [image, setImage] = useState([]);
    const [page, setPage] = useState(1);

    const totalItems = devices?.count;
    const itemPerPage = devices?.perPage;
    const countPage = Math.ceil(totalItems/ itemPerPage);
    let numberPage = [];
    for (let i = 1; i <= countPage; i++ ){
        numberPage.push(i);
    }

    useEffect (() => {
        getTypes().then(data => setTypes(data));
        getBrands().then(data => setBrands(data));
        getDevices(selectedBrand, selectedType, page).then(data => setDevices(data));
        getImageDevice().then(data => setImage(data));
    },[selectedBrand, selectedType, page, countPage]);

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
              {
                  countPage > 1 && <div className={'shop_div_paginationDevice'}>
                      <Pagination>
                          {page !== 1 && <Pagination.First onClick={() => {
                              setPage(1)
                          }}/>}
                          {page !== 1 && <Pagination.Prev onClick={() => {
                              setPage(page - 1)
                          }}/>}
                          {numberPage.map((c, index) => <PaginationDevice key={index} item={c} setPage={setPage}
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
});

export default Shop;