import React from 'react';
import useAuth from "../../hook/useAuth";

const TypeCard = ({type}) => {
    const {setSelectedType, selectedType} = useAuth();
    return (
        <div
            onClick={() => setSelectedType(type.id)}
            className={type.id === selectedType ? 'typeBar_card_select': 'typeBar_card'}>
             {type.name}
        </div>
    );
};

export default TypeCard;