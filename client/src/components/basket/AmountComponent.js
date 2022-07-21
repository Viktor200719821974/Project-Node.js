import React from 'react';
import useAuth from "../../hook/useAuth";

const AmountComponent = ({amount, deviceId}) => {
    const {setAmount} = useAuth();
    return (
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <input
                type={'number'}
                value={amount}
                min={'1'}
                onChange={(e) => setAmount(e.target.value, deviceId)}
            />
        </div>
    );
};

export default AmountComponent;