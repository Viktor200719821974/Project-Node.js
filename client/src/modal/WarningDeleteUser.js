import React, {useState} from 'react';
import {Alert, Button, Modal} from "react-bootstrap";
import {deleteUser} from "../http/userApi";

const WarningDeleteUser = ({show, onHide, setStatusResponse, id}) => {
    const [error, setError] = useState('');

    const del = () => {
        try {
            deleteUser(id).then(data => {
                if(data === 'Ok'){
                    setStatusResponse(true);
                }
            }).catch(err => {
                if(err.response){
                    setError(err.response.data.message);
                }
            });
            onHide();
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
            {error && <Alert variant={'danger'} style={{textAlign: 'center', fontSize: '20px'}}>{error}</Alert>}
            <Modal.Body className={'confirmDelete_modal'}>
                {`Увага!!! Ви дійсно хочете видалити цього користувача!!! `}
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"outline-warning"} style={{marginTop: 2}} onClick={onHide}>Відмінити</Button>
                <Button variant={"outline-danger"} onClick={del}>Видалити</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default WarningDeleteUser;