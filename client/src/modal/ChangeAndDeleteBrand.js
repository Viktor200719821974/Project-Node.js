import React, {useEffect, useState} from 'react';
import {Modal} from "react-bootstrap";
import useAuth from "../hook/useAuth";
import TypeBrandCardAdmin from "../components/TypeBrandCardAdmin";
import {getBrands} from "../http/brandApi";

const ChangeAndDeleteBrand = ({show, onHide}) => {
    const {brands, setBrands} = useAuth();
    const [statusResponse, setStatusResponse] = useState(false);
    
    useEffect(() => {
        if (statusResponse){
            getBrands().then(data => {
                if (data){
                    setBrands(data);
                }
            }).catch(err => {
                if (err.response) {
                    alert(err.response.data.message);
                }
            });
            setStatusResponse(false);
        }
    },[statusResponse]);
    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Змінити або видалити бренд
                </Modal.Title>
            </Modal.Header>
            <div className={'brandBar_div'}>
                { brands && brands.map((brand) =>
                    <TypeBrandCardAdmin
                        key={brand.id}
                        value={brand}
                        type={'brand'}
                        setStatusResponse={setStatusResponse}
                    />
                )}
            </div>
        </Modal>
    );
};

export default ChangeAndDeleteBrand;