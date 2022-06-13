import React, {useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {createType} from "../http/typeApi";

const CreateType = ({show, onHide}) => {
    const [value, setValue] = useState('');
    // const [statusResponse, setStatusResponse] = useState(false);

    const addType = () => {
        createType({name:value}).then(data => {
            // if (data.name){
            //     setStatusResponse(true);
            // }
            setValue('');
        });
        onHide();
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
            {/*{statusResponse && <Alert variant={'success'}>*/}
            {/*    * Тип був добавлений!!!*/}
            {/*</Alert>}*/}
            {/*{statusResponse  && <div className={'createDevice_div_successfully'}>*/}
            {/*    * Тип був добавлений!!!*/}
            {/*</div>}*/}
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