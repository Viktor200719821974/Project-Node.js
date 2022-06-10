import React, {useState} from 'react';
import {Button, Form, Modal, Spinner} from "react-bootstrap";
import {createBrand} from "../http/brandApi";

const CreateBrand = ({show, onHide}) => {
    const [value, setValue] = useState('');
    // const [statusResponse, setStatusResponse] = useState(false);
    const [loading, setLoading] = useState(true);

    const addBrand = () => {
        createBrand({name:value}).then(data => {
            setLoading(false);
            // if (data.name){
            //     setStatusResponse(true);
            // }
            setValue('');
        });
        onHide();
    }
    if (loading){
        return <Spinner animation={"grow"}/>
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
            {/*{statusResponse && <Alert variant={'success'}>*/}
            {/*    * Бренд був добавлений!!!*/}
            {/*</Alert>}*/}
            {/*{statusResponse  && <div className={'createDevice_div_successfully'}>*/}
            {/*   * Бренд був добавлений!!!*/}
            {/*</div>}*/}
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