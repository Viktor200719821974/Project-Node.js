import React from 'react';
import {Modal} from "react-bootstrap";
import useAuth from "../hook/useAuth";
import TypeBrandCardAdmin from "../components/TypeBrandCardAdmin";

const ChangeAndDeleteType = ({show, onHide}) => {
    const {types} = useAuth();

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Змінити або видалити тип
                </Modal.Title>
            </Modal.Header>
        <div className={'brandBar_div'} >
            { types && types.map((type) =>
                <TypeBrandCardAdmin key={type.id} value={type} type={'type'}/>
            )}
        </div>
        </Modal>
    );
};

export default ChangeAndDeleteType;