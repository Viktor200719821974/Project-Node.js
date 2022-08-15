import React, {useState} from 'react';
import {Alert, Button, Form, Modal} from "react-bootstrap";
import {createType} from "../http/typeApi";

const CreateType = ({show, onHide, setResponse}) => {
    const [value, setValue] = useState('');
    const [statusResponse, setStatusResponse] = useState(false);
    const [error, setError] = useState('');

    const addType = () => {
        try{
            createType({name:value}).then(data => {
                if (data.name){
                    setStatusResponse(true);
                    setResponse(true);
                    setError('');
                }
                setValue('');
            }).catch(err => {
                if (err.response) {
                    setError(err.response.data.message);
                    setStatusResponse(false);
                }
            });
            // onHide();
        }catch (e) {
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
                    Додати новий тип
                </Modal.Title>
            </Modal.Header>
            {statusResponse && <Alert variant={'success'} style={{textAlign: 'center', fontSize: '20px'}}>
                * Тип був добавлений!!!
            </Alert>}
            {error && <Alert variant={'danger'} style={{textAlign: 'center', fontSize: '20px'}}>{error}</Alert>}
            <Modal.Body>
                <Form>
                   <Form.Control
                       placeholder={"Введіть назву типу"}
                       value={value}
                       onChange={(e) => setValue(e.target.value)}
                   />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"outline-success"} onClick={addType}>Додати</Button>
                <Button variant={"outline-danger"} onClick={onHide}>Закрити</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateType;