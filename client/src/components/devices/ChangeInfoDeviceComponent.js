import React, {useState} from 'react';
import {Button} from "react-bootstrap";
import ChangeInfoDevice from "../../modal/changeDevice/ChangeInfoDevice";
import {deleteInfoDevice} from "../../http/deviceApi";

const ChangeInfoDeviceComponent = ({setStatusResponse, title, description, id}) => {
    const [changeInfo, setChangeInfo] = useState(false);
    console.log(id);
    const del = () => {
        deleteInfoDevice(id).then(data => {
            if (data === 'Ok'){
                setStatusResponse(true);
            }
        });
    }
    return (
        <div className={'brandBar_div'} style={{padding: '10px'}}>
            <div className={'changeInfoDevice_div'}>
                {title}: {description}
            </div>
            <Button
                variant={"outline-warning"}
                style={{margin: '0 10px'}}
                onClick={() => setChangeInfo(true)}
            >
                Змінити
            </Button>
            <ChangeInfoDevice
                show={changeInfo}
                onHide={() => setChangeInfo(false)}
                id={id}
                title={title}
                description={description}
                setStatusResponse={setStatusResponse}
            />
            <Button
                variant={"outline-danger"}
                style={{margin: '0 10px'}}
                onClick={del}
            >
                Видалити
            </Button>
        </div>
    );
};

export default ChangeInfoDeviceComponent;