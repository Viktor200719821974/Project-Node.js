import React, {useState} from 'react';
import {Button, Container} from "react-bootstrap";
import {useHistory} from "react-router-dom";
import CreateBrand from "../modal/CreateBrand";
import CreateType from "../modal/CreateType";
import CreateDevice from "../modal/CreateDevice";
import ChangeAndDeleteBrand from "../modal/changeDeleteBrandType/ChangeAndDeleteBrand";
import ChangeAndDeleteType from "../modal/changeDeleteBrandType/ChangeAndDeleteType";
import {DEVICE_CARD_ADMIN_ROUTE, USER_BLOCKED_ADMIN_ROUTE} from "../utils/constans";

const Admin = () => {
    const history = useHistory();
    const [brandVisible, setBrandVisible] = useState(false);
    const [changeAndDeleteBrandVisible, setChangeAndDeleteBrandVisible] = useState(false);
    const [changeAndDeleteTypeVisible, setChangeAndDeleteTypeVisible] = useState(false);
    const [typeVisible, setTypeVisible] = useState(false);
    const [deviceVisible, setDeviceVisible] = useState(false);
    const [response, setResponse] = useState(false);

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
            <Button
                variant={"primary"}
                className={"mt-4 p-2"}
                onClick={() => history.push(USER_BLOCKED_ADMIN_ROUTE)}
            >
                Заблокувати або розблокувати користувача
            </Button>
            <CreateBrand
                show={brandVisible}
                onHide={() => setBrandVisible(false)}
                setResponse={setResponse}
            />
            <ChangeAndDeleteBrand
                show={changeAndDeleteBrandVisible}
                onHide={() => setChangeAndDeleteBrandVisible(false)}
                setResponse={setResponse}
                response={response}
            />
            <CreateType
                show={typeVisible}
                onHide={() => setTypeVisible(false)}
                setResponse={setResponse}
            />
            <ChangeAndDeleteType
                show={changeAndDeleteTypeVisible}
                onHide={() => setChangeAndDeleteTypeVisible(false)}
                setResponse={setResponse}
                response={response}
            />
            <CreateDevice
                show={deviceVisible}
                onHide={() => setDeviceVisible(false)}
            />
        </Container>
    );
};

export default Admin;