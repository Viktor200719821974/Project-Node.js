import React, {useState} from 'react';
import {Alert, Button, Form, Modal} from "react-bootstrap";
import {createBrand} from "../http/brandApi";

const CreateBrand = ({show, onHide, setResponse}) => {
    const [value, setValue] = useState('');
    const [statusResponse, setStatusResponse] = useState(false);
    const [error, setError] = useState('');

    const addBrand = () => {
        try {
            createBrand({name: value}).then(data => {
                if (data.name) {
                    setStatusResponse(true);
                    setError('');
                    setResponse(true);
                }
                setValue('');
            }).catch(err => {
                if (err.response) {
                    setError(err.response.data.message);
                    setStatusResponse(false);
                }
            });
            // onHide();
        } catch (e) {
            console.log(e.message);
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
                    Додати новий бренд
                </Modal.Title>
            </Modal.Header>
            {statusResponse && <Alert variant={'success'} style={{textAlign: 'center', fontSize: '20px'}}>
                * Бренд був добавлений!!!
            </Alert>}
            {error && <Alert variant={'danger'} style={{textAlign: 'center', fontSize: '20px'}}>{error}</Alert>}
            <Modal.Body>
                <Form>
                    <Form.Control
                        placeholder={"Введіть назву бренду"}
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"outline-success"} onClick={addBrand}>Додати</Button>
                <Button variant={"outline-danger"} onClick={onHide}>Закрити</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateBrand;