import React, {useContext} from 'react';
import {Context} from "../index";
import {Row} from "react-bootstrap";
import DeviceItem from "./DeviceItem";
import {observer} from "mobx-react-lite";

const DeviceList = observer(({image}) => {
    const {device} = useContext(Context);
    return (
        <Row className={"d-flex"}>
            {device.devices.map(device =>
            <DeviceItem key={device.id} device={device} image={image.filter(c => c.deviceId === device.id)}/>
            )}
        </Row>
    );
});

export default DeviceList;