import React from 'react';
import {Row} from "react-bootstrap";
import DeviceItem from "./DeviceItem";
import {observer} from "mobx-react-lite";
import useAuth from "../../hook/useAuth";

const DeviceList = observer(({image}) => {
    const auth = useAuth();
    const devices = auth.devices;
    return (
        <Row className={"d-flex"}>
            { devices && devices.map(device =>
            <DeviceItem key={device.id} device={device} image={image}/>
            )}
        </Row>
    );
});
// .filter(c => c.deviceId === device.id)
export default DeviceList;