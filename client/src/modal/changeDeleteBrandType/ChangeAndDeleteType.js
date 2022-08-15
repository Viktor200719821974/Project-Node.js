import React, {useEffect, useState} from 'react';
import {Modal} from "react-bootstrap";
import useAuth from "../../hook/useAuth";
import TypeBrandCardAdmin from "../../components/TypeBrandCardAdmin";
import {getTypes} from "../../http/typeApi";

const ChangeAndDeleteType = ({show, onHide, response, setResponse}) => {
    const {types, setTypes} = useAuth();
    const [statusResponse, setStatusResponse] = useState(false);

    useEffect(() => {
        if (statusResponse || response){
            getTypes().then(data => {
                if (data){
                    setTypes(data);
                }
            }).catch(err => {
                if (err.response) {
                    alert(err.response.data.message);
                }
            });
            setStatusResponse(false);
            setResponse(false);
        }
        // eslint-disable-next-line
    },[statusResponse, response]);
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
                <TypeBrandCardAdmin
                    key={type.id}
                    value={type}
                    type={'type'}
                    setStatusResponse={setStatusResponse}
                />
            )}
        </div>
        </Modal>
    );
};

export default ChangeAndDeleteType;