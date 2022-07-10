import React, {useState} from 'react';
import ChangeDeleteBrandType from "../modal/ChangeDeleteBrandType";

const TypeBrandCardAdmin = ({value, type}) => {
    const [changeDelete, setChangeDelete] = useState(false);

    return (
        <div className={'brandBar_card'}>
        <div onClick={() => setChangeDelete(true)}>
            {value.name}
        </div>
            <ChangeDeleteBrandType
                show={changeDelete}
                onHide={() => setChangeDelete(false)}
                id={value.id}
                name={value.name}
                type={type}
            />
        </div>
    );
};

export default TypeBrandCardAdmin;