import React, {useState} from 'react';
import ChangeDeleteBrandType from "../modal/changeDeleteBrandType/ChangeDeleteBrandType";

const TypeBrandCardAdmin = ({value, type, setStatusResponse}) => {
    const [changeDelete, setChangeDelete] = useState(false);
    console.log(value.id);
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
                setStatusResponse={setStatusResponse}
            />
        </div>
    );
};

export default TypeBrandCardAdmin;