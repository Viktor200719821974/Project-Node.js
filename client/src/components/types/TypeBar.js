import React from 'react';
import {observer} from "mobx-react-lite";
import useAuth from '../../hook/useAuth';
import {ListGroup} from "react-bootstrap";

const TypeBar = observer(() => {
    const {types} = useAuth();
    return (
        <ListGroup>
            { types && types.map(type =>
                <ListGroup.Item
                style={{cursor: 'pointer'}}
                // active={type.id === device.selectedType.id}
                // onClick={() => device.setSelectedType(type)}
                key={type.id}>
                {type.name}

                </ListGroup.Item>
            )}
        </ListGroup>
    );
});

export default TypeBar;