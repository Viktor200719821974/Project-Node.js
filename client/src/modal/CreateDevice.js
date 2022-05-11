import React, {useContext, useState} from 'react';
import {Button, Col, Dropdown, Form, Modal, Row} from "react-bootstrap";
import {Context} from "../index";

const CreateDevice = ({show, onHide}) => {
    const {device} = useContext(Context);
    const [info, setInfo] = useState([]);
    const addInfo = () => {
        setInfo([...info, {title: '', description: '', number: Date.now()}]);
    }
    const removeInfo = (number) => {
        setInfo(info.filter(i => i.number !== number));
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
            <Modal.Body>
                <Form>
                    <Dropdown className={"mt-2 mb-2"}>
                        <Dropdown.Toggle>Виберіть тип</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {device.types.map(type =>
                            <Dropdown.Item key={type.id}>{type.name}</Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown className={"mt-2 mb-2"}>
                        <Dropdown.Toggle>Виберіть бренд</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {device.brands.map(brand =>
                                <Dropdown.Item key={brand.id}>{brand.name}</Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Form.Control placeholder={"Введіть назву пристрою"} className={"mt-3"}/>
                    <Form.Control placeholder={"Введіть вартість пристрою"} className={"mt-3"} type={"number"}/>
                    <Form.Control className={"mt-3"} type={"file"}/>
                    <hr/>
                    <Button variant={"outline-dark"} onClick={addInfo} className={"mb-2"}>Додати нову властивість
                    </Button>
                    {info.map(i =>
                    <Row key={i.number}>
                        <Col md={4}>
                            <Form.Control placeholder={"Введіть назву властивості"}/>
                        </Col>
                        <Col md={4}>
                            <Form.Control placeholder={"Введіть опис властивості"}/>
                        </Col>
                        <Col md={4}>
                            <Button variant={"outline-danger"} className={"mt-2"} onClick={() => removeInfo(i.number)}>
                                Видалити
                            </Button>
                        </Col>
                    </Row>
                    )}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"outline-success"} onClick={onHide}>Додати</Button>
                <Button variant={"outline-danger"} onClick={onHide}>Закрити</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateDevice;