import React from 'react';
import {Button, Modal} from "react-bootstrap";
import {deleteType} from "../../http/typeApi";
import {deleteBrand} from "../../http/brandApi";

const ConfirmDelete = ({show, onHide, type, id, setStatusResponse}) => {
    console.log(id);
    const del = () => {
        try {
            if (type === 'type'){
                deleteType(id).then(data => {
                    if (data === 'Ok'){
                       setStatusResponse(true);
                    }
                });
            }
            if (type === 'brand'){
                deleteBrand(id).then(data => {
                    if (data === 'Ok'){
                        setStatusResponse(true);
                    }
                });
            }
        } catch (e) {
            console.log(e.message);
        }
    }
    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            // style={{width: '300px'}}
            centered
        >

         <Modal.Body className={'confirmDelete_modal'}>
             {`Увага!!! Якщо видалити ${type}, то будуть також видалені пристрої, повязані з цим ${type}!!! `}
         </Modal.Body>
            <Modal.Footer>
            <Button variant={"outline-warning"} style={{marginTop: 2}} onClick={onHide}>Відмінити</Button>
            <Button variant={"outline-danger"} onClick={del}>Видалити</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ConfirmDelete;