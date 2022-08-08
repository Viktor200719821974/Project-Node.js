import React, {useState} from 'react';
import {Alert, Button, Form, Modal} from "react-bootstrap";
import {createImageDevice} from "../../http/imageDeviceApi";

const AddImageDeviceModal = ({show, onHide, setStatusResponse, id}) => {
    const [file, setFile] = useState([]);
    const [error, setError] = useState('');
    const [loadedImage, setLoadedImage] = useState(false);

    const selectFile = e => {
        setFile(e.target.files[0]);
    }
    const addImage = () => {
        try {
            const formImage = new FormData();
            formImage.append('image', file);
            createImageDevice(id, formImage).then(data => {
                if (data.imageLocation) {
                    setStatusResponse(true);
                    setLoadedImage(true);
                }
            }).catch(err => {
                if (err.response) {
                    setError(err.response.data.message);
                    setStatusResponse(false);
                    setLoadedImage(false);
                }
            });
        } catch (e) {
            setError(e.message);
        }
    }
    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Додати новий пристрій
                </Modal.Title>
            </Modal.Header>
            {(loadedImage) && <Alert variant={'success'} style={{textAlign: 'center', fontSize: '20px'}}>
                Фото було добавлено!!!
            </Alert>}
            {error && <Alert variant={'danger'} style={{textAlign: 'center', fontSize: '20px'}}>{error}</Alert>}
            <Modal.Body>
                <Form>
                    <div className={'createDevice_div_addImage'}>
                        <Form.Control
                            className={"mt-3"}
                            type={"file"}
                            onChange={selectFile}
                        />
                        <div className={'createDevice_button_addImage'}>
                            <Button
                                variant={"outline-success"}
                                onClick={addImage}
                            >
                                Додати фото
                            </Button>
                        </div>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default AddImageDeviceModal;