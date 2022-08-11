import React, {useEffect, useState} from 'react';
import {Button, Image, Modal} from "react-bootstrap";
import {useHistory} from "react-router-dom";
import {MdOutlineDeleteForever} from "react-icons/md";
import {deleteImageDevice} from "../../http/imageDeviceApi";

const ImageModal = ({show, onHide, image, id, setStatusResponse, deviceId}) => {
    const [staff, setStaff] = useState(false);
    const history = useHistory();

    useEffect(() => {
        if (history.location.pathname === `/deviceCardAdmin/${deviceId}`){
            setStaff(true);
        }
    },[deviceId, history, staff]);
    const del = () => {
        try {
            deleteImageDevice(id).then(data => Promise.resolve(data).then(function (data) {
                if (data === 'Ok'){
                    setStatusResponse(true);
                    onHide();
                }
            }));
        } catch (e) {
            alert(e.message);
        }
    }
    return (
            <Modal
                show={show}
                onHide={onHide}
                size="sm"
                centered
            >
                <div className={'imageModal_main_div'}>
                    {staff && <Button
                        variant={"outline-danger"}
                        className={'imageModal_div_button'}
                        onClick={del}
                    >
                        <MdOutlineDeleteForever size={'25px'}/>Видалити
                    </Button>}
                    <Image
                        src={image}
                        alt={'imageDeviceMore'}
                        width={700}
                        height={700}
                        style={{objectFit: 'contain'}}
                    />
                </div>


            </Modal>

    );
};

export default ImageModal;