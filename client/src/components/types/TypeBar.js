import React, {useState} from 'react';
import {observer} from "mobx-react-lite";
import useAuth from '../../hook/useAuth';
import {Button, Form, ListGroup} from "react-bootstrap";
// import TypeCard from "./TypeCard";

const TypeBar = observer(() => {
    const {types, setSelectedType, setSelectedBrand, selectedType} = useAuth();
    // const [name, setName] = useState('');
    //     // console.log(name);
    const allDevices = () => {
        setSelectedBrand(null);
        setSelectedType(null);
    }
    return (
        // <div className={'typeBar_div'}>

        //     { types && types.map((type) => <TypeCard  key={type.id} type={type}/>)}
        // </div>
        <ListGroup>
            {/*<div className={'typeBar_listGroup_div'}*/}
            {/*<form>*/}
            {/*    <input type="text" value={name} onChange={e => setName(e.target.value)} />*/}
            {/*    <input type="submit" value="Надіслати" />*/}
            {/*</form>*/}
            {/*<Form.Control*/}
            {/*    placeholder={"Введіть назву пристрою"}*/}
            {/*    className={"mt-3"}*/}
            {/*    value={name}*/}
            {/*    onChange={e => setName(e.target.value)}*/}
            {/*/>*/}
            {/*    <button>t</button>*/}
            {/*</div>*/}
            <Button variant={"outline-secondary"} onClick={allDevices} className={"mb-2"}>
                Показати всі
            </Button>
            { types && types.map((type) =>
                <ListGroup.Item
                style={{cursor: 'pointer', textAlign: 'center'}}
                // className={'typeBar_card'}
                action variant="light"
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