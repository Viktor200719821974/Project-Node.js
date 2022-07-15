import React, {useEffect, useState} from 'react';
import {getUsers} from "../http/userApi";
import {Alert} from "react-bootstrap";
import UserComponent from "../components/user/UserComponent";

const BlockedAndUnblockedUser = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');
    const [statusResponse, setStatusResponse] = useState(false);

    useEffect(() => {
        try {
            getUsers().then(data => {
                if (data){
                    setUsers(data);
                    setError('');
                }
            }).catch(err => {
                if (err.response) {
                    setError(err.response.data.message);
                }
            });
            if (statusResponse){
                setStatusResponse(false);
            }
        } catch (e) {
            setError(e.message);
        }
    },[statusResponse]);
    return (
        <>
            {error && <Alert variant={'danger'} style={{textAlign: 'center', fontSize: '20px'}}>{error}</Alert>}
        <div className={'blockedAndUnlockedUser_main_div'}>
            {
                users && users.map((c, index) =>
                    <UserComponent
                        key={index}
                        email={c.email}
                        name={c.name}
                        surname={c.surname}
                        age={c.age}
                        phone={c.phone}
                        is_active={c.is_active}
                        is_staff={c.is_staff}
                        id={c.id}
                        setStatusResponse={setStatusResponse}
                        setError={setError}
                    />)}
        </div>
        </>
    );
};

export default BlockedAndUnblockedUser;