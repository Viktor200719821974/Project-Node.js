import React from 'react';
import {Row} from "react-bootstrap";
import DeviceItem from "./DeviceItem";
import {observer} from "mobx-react-lite";
import useAuth from "../../hook/useAuth";

const DeviceList = observer(({image}) => {
    const {devices, brands, types} = useAuth();
    return (
        <Row className={"d-flex"}>
            { devices && devices.rows.map(device =>
            <DeviceItem
                key={device.id}
                device={device}
                image={image.filter(c => c.deviceId === device.id)}
                type={types.filter(c => c.id === device.typeId).map(c => c.name)}
                brand={brands.filter(c => c.id === device.brandId).map(c => c.name)}
                rating={device.rating?.averageRating}
            />
            )}
        </Row>
    );
});
// .filter(c => c.deviceId === device.id)
export default DeviceList;