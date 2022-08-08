import React from 'react';
import {Modal} from "react-bootstrap";
import '../../style/style.css';
import ChangeInfoDeviceComponent from "../../components/devices/ChangeInfoDeviceComponent";

const ChangeDeleteInfoDevice = ({show, onHide, info, setStatusResponse}) => {

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="500px"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Змінити або видалити додаткову інформацію для пристроя
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {info.map((c, index) =>
                        <ChangeInfoDeviceComponent
                            key={index}
                            setStatusResponse={setStatusResponse}
                            title={c.title}
                            description={c.description}
                            id={c.id}
                        />
                )}

            </Modal.Body>
        </Modal>
    );
};

export default ChangeDeleteInfoDevice;