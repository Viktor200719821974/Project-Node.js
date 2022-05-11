import React from 'react';
import {Button, Form, Modal} from "react-bootstrap";

const CreateBrand = ({show, onHide}) => {
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
            <Modal.Body>
                <Form>
                    <Form.Control placeholder={"Введіть назву бренду"}/>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"outline-success"} onClick={onHide}>Додати</Button>
                <Button variant={"outline-danger"} onClick={onHide}>Закрити</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateBrand;