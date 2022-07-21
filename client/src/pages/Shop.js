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
    const {setTypes, setBrands, setDevices, selectedBrand, selectedType} = useAuth();
    const [image, setImage] = useState([]);
    const [page, setPage] = useState(1);
    const [countPage, setCountPage] = useState();
    const [name] = useState('');

    let numberPage = [];
    for (let i = 1; i <= countPage; i++ ){
        Number(i);
        numberPage.push(i);
    }

    useEffect (() => {
        try{
            getTypes().then(data => {
                if (data) {
                    setTypes(data);
                }
            }).catch(err => {
                if (err.response) {
                    alert(err.response.data.message || err.message);
                }
            });
            getBrands().then(data => {
                if (data){
                    setBrands(data);
                }
            }).catch(err => {
                if (err.response) {
                    alert(err.response.data.message || err.message);
                }
            });
            getDevices(page, name, selectedBrand, selectedType).then(data => {
                setDevices(data);
                if (data.count && data.perPage){
                    Number(data.count);
                    Number(data.perPage);
                    setCountPage(Math.ceil(data.count/ data.perPage));
                }
                if (countPage && countPage < page){
                    setPage(1);
                }
            }).catch(err => {
                if (err.response) {
                    alert(err.response.data.message || err.message);
                }
            });
            getImageDevice().then(data => setImage(data));
        }catch (e) {
            console.log(e.message);
        }

    },[selectedBrand, selectedType, page, countPage]);

    return (
        <Container className={'shop_container'}>
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
});

export default Shop;