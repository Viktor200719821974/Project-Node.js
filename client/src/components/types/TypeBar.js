import React from 'react';
import {observer} from "mobx-react-lite";
import useAuth from '../../hook/useAuth';
import {Button, ListGroup} from "react-bootstrap";
// import TypeCard from "./TypeCard";

const TypeBar = observer(() => {
    const {types, setSelectedType, setSelectedBrand, selectedType} = useAuth();
    const allDevices = () => {
        setSelectedBrand(null);
        setSelectedType(null);
    }
    return (
        <ListGroup>
            <Button onClick={allDevices} className={"typeBar_button_top"}>
                Показати всі
            </Button>
            { types && types.map((type) =>
                <ListGroup.Item
                style={{cursor: 'pointer', textAlign: 'center'}}
                className={'typeBar_card'}
                variant="primary"
                active={type.id === selectedType}
                onClick={() => setSelectedType(type.id)}
                key={type.id}>
                {type.name}
                </ListGroup.Item>
            )}
        </ListGroup>
    );
});

export default TypeBar;