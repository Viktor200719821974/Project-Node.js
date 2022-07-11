import React, {useState} from 'react';
import {Button, Container} from "react-bootstrap";
import {useHistory} from "react-router-dom";
import CreateBrand from "../modal/CreateBrand";
import CreateType from "../modal/CreateType";
import CreateDevice from "../modal/CreateDevice";
import ChangeAndDeleteBrand from "../modal/ChangeAndDeleteBrand";
import ChangeAndDeleteType from "../modal/ChangeAndDeleteType";
import {DEVICE_CARD_ADMIN_ROUTE} from "../utils/constans";

const Admin = () => {
    const history = useHistory();
    const [brandVisible, setBrandVisible] = useState(false);
    const [changeAndDeleteBrandVisible, setChangeAndDeleteBrandVisible] = useState(false);
    const [changeAndDeleteTypeVisible, setChangeAndDeleteTypeVisible] = useState(false);
    const [typeVisible, setTypeVisible] = useState(false);
    const [deviceVisible, setDeviceVisible] = useState(false);
    return (
        <Container className={"d-flex flex-column"}>
          <Button
              variant={"primary"}
              className={"mt-4 p-2"}
              onClick={() => setTypeVisible(true)}>
              Додати тип
          </Button>
            <Button
                variant={"primary"}
                className={"mt-4 p-2"}
                onClick={() => setChangeAndDeleteTypeVisible(true)}>
                Змінити або видалити тип
            </Button>
            <Button
                variant={"primary"}
                className={"mt-4 p-2"}
                onClick={() => setBrandVisible(true)}>
                Додати бренд
            </Button>
            <Button
                variant={"primary"}
                className={"mt-4 p-2"}
                onClick={() => setChangeAndDeleteBrandVisible(true)}>
                Змінити або видалити бренд
            </Button>
            <Button
                variant={"primary"}
                className={"mt-4 p-2"}
                onClick={() => setDeviceVisible(true)}>
                Додати пристрій
            </Button>
            <Button
                variant={"primary"}
                className={"mt-4 p-2"}
                onClick={() => history.push(DEVICE_CARD_ADMIN_ROUTE)}
            >
                Змінити або видалити пристрій
            </Button>
            <CreateBrand
                show={brandVisible}
                onHide={() => setBrandVisible(false)}
            />
            <ChangeAndDeleteBrand
                show={changeAndDeleteBrandVisible}
                onHide={() => setChangeAndDeleteBrandVisible(false)}
            />
            <CreateType
                show={typeVisible}
                onHide={() => setTypeVisible(false)}
            />
            <ChangeAndDeleteType
                show={changeAndDeleteTypeVisible}
                onHide={() => setChangeAndDeleteTypeVisible(false)}
            />
            <CreateDevice
                show={deviceVisible}
                onHide={() => setDeviceVisible(false)}
            />
        </Container>
    );
};

export default Admin;