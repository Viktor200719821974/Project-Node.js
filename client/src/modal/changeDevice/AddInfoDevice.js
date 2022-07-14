import React, {useState} from 'react';
import {Alert, Button, Form, Modal} from "react-bootstrap";
import {addInfoDevice} from "../../http/deviceApi";

const AddInfoDevice = ({show, onHide, id, setStatusResponse}) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');

    const addInfo = () => {
        try {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('description', description);
            addInfoDevice(id, formData).then(data => {
                if (data){
                    setTitle('');
                    setDescription('');
                    setError('');
                    setStatusResponse(true);
                    onHide();
                }
            }).catch(err => {
                if (err.response){
                    setError(err.response.data.message);
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
            size="500px"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Додати додаткову інформацію для пристроя
                </Modal.Title>
            </Modal.Header>
                {error && <Alert variant={'danger'} style={{textAlign: 'center', fontSize: '20px'}}>{error}</Alert>}
            <Modal.Body>
            <Form>
                <Form.Control
                    placeholder={'Введіть назву додаткового поля пристрою...'}
                    className={"mt-3"}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                >
                </Form.Control>
                    <Form.Control
                        placeholder={'Введіть значення додаткового поля пристрою...'}
                        className={"mt-3"}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    >
                    </Form.Control>
            </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"outline-success"} onClick={addInfo} style={{marginTop: 2}}>Додати</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddInfoDevice;