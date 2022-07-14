import React, {useState} from 'react';
import {Button, Modal} from "react-bootstrap";
import '../../style/style.css';
import {deleteInfoDevice} from "../../http/deviceApi";
import ChangeInfoDevice from "./ChangeInfoDevice";

const ChangeDeleteInfoDevice = ({show, onHide, info, setStatusResponse}) => {
    const [changeInfo, setChangeInfo] = useState(false);

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
                {info.map((c, index) => <div key={index} className={'brandBar_div'} style={{padding: '10px'}}>
                    <div className={'changeInfoDevice_div'}>
                        {c.title}: {c.description}
                    </div>
                        <Button
                            variant={"outline-warning"}
                            style={{margin: '0 10px'}}
                            onClick={() => setChangeInfo(true)}
                        >
                            Змінити
                        </Button>
                        <ChangeInfoDevice
                            show={changeInfo}
                            onHide={() => setChangeInfo(false)}
                            id={c.id}
                            title={c.title}
                            description={c.description}
                            setStatusResponse={setStatusResponse}
                        />
                        <Button
                            variant={"outline-danger"}
                            style={{margin: '0 10px'}}
                            onClick={() => deleteInfoDevice(c.id).then(data => {if (data === 'Ok'){setStatusResponse(true)}})}
                        >
                            Видалити
                        </Button>
                </div>)}

            </Modal.Body>
        </Modal>
    );
};

export default ChangeDeleteInfoDevice;