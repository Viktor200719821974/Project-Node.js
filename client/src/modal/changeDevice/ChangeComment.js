import React, {useState} from 'react';
import {Alert, Button, Form, Modal} from "react-bootstrap";
import {changeRatingDeviceId} from "../../http/ratingApi";

const ChangeComment = ({show, onHide, comment, id, setStatusResponse}) => {
    const [newComment, setNewComment] = useState('');
    const [error, setError] = useState('');

    const change = () => {
        try {
            const formData = new FormData();
            formData.append('comment', newComment);
            changeRatingDeviceId(id, formData).then(data => {
                if (data) {
                    setStatusResponse(true);
                }
            }).catch(err => {
                if (err.response){
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
            size="600px"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Змінити коментар для пристроя
                </Modal.Title>
            </Modal.Header>
            {error && <Alert variant={'danger'} style={{textAlign: 'center', fontSize: '20px'}}>{error}</Alert>}
            <Modal.Body>
                <Form>
                    <Form.Control
                        placeholder={comment}
                        className={"mt-3"}
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                    >
                    </Form.Control>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"outline-warning"} onClick={change} style={{marginTop: 2}}>Змінити</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ChangeComment;