import React, {useState} from 'react';
import {Alert, Button, Form, Modal} from "react-bootstrap";
import {changeBrand} from "../../http/brandApi";
import {changeType} from "../../http/typeApi";
import ConfirmDelete from "./ConfirmDelete";

const ChangeDeleteBrandType = ({show, onHide, id, name, type, setStatusResponse}) => {
    const [value, setValue] = useState('');
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [error, setError] = useState('');
    console.log(id);
    const change = () => {
        const formData = new FormData();
        formData.append('name', value);
        try {
            if (type === 'type'){
                changeType(id, formData).then(data => {
                    if (data){
                        setStatusResponse(true);
                        setError('');
                        // onHide();
                    }
                }
                ).catch(err => {
                    if (err.response){
                        setError(err.response.data.message);
                    }
                });
            }
            if (type === 'brand'){
               changeBrand(id, formData).then(data => {
                   if (data){
                       setStatusResponse(true);
                       setError('');
                   }
               }).catch(err => {
                   if (err.response){
                       setError(err.response.data.message);
                   }
               });
            }
            onHide();
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
            <Modal.Header closeButton/>
            {error && <Alert variant={'danger'} style={{textAlign: 'center', fontSize: '20px'}}>{error}</Alert>}
            <Modal.Body>
                <Form>
                    <Form.Control
                        placeholder={name}
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"outline-success"} onClick={change}>Змінити</Button>
                {/*<Button variant={"outline-warning"} style={{marginTop: 2}} onClick={onHide}>Закрити</Button>*/}
                <Button variant={"outline-danger"} onClick={() => setConfirmDelete(true)}>Видалити</Button>
                <ConfirmDelete
                    show={confirmDelete}
                    onHide={() => setConfirmDelete(false)}
                    id={id}
                    type={type}
                    setStatusResponse={setStatusResponse}
                />
            </Modal.Footer>
        </Modal>
    );
};

export default ChangeDeleteBrandType;