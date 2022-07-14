import React, {useState} from 'react';
import {Alert, Button, Form, Modal} from "react-bootstrap";
import {changeInfoDevice} from "../../http/deviceApi";

const ChangeInfoDevice = ({show, onHide, id, title, description, setStatusResponse}) => {
    const [newTitle, setNewTitle] = useState('');
    const [newDescription, setNewDescription] = useState('');
    const [error, setError] = useState('');
    console.log(title, description);
    const changeInfo = () => {
        try {
            const formData = new FormData();
            formData.append('title', newTitle || title);
            formData.append('description', newDescription || description);
            changeInfoDevice(id, formData).then(data => {
                if (data){
                    console.log(data);
                    setNewTitle('');
                    setNewDescription('');
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
            size="600px"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Змінити додаткову інформацію для пристроя
                </Modal.Title>
            </Modal.Header>
            {error && <Alert variant={'danger'} style={{textAlign: 'center', fontSize: '20px'}}>{error}</Alert>}
            <Modal.Body>
                <Form>
                    <Form.Control
                        placeholder={`Введіть назву додаткового поля пристрою...було ${title}`}
                        className={"mt-3"}
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                    >
                    </Form.Control>
                    <Form.Control
                        placeholder={`Введіть значення додаткового поля пристрою...було ${description}`}
                        className={"mt-3"}
                        value={newDescription}
                        onChange={(e) => setNewDescription(e.target.value)}
                    >
                    </Form.Control>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"outline-warning"} onClick={changeInfo} style={{marginTop: 2}}>Змінити</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ChangeInfoDevice;