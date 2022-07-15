import React, {useState} from 'react';
import {Button} from "react-bootstrap";
import {userIsBlocked, userIsNotManager, userIsUnlocked, userManager} from "../../http/userApi";
import useAuth from "../../hook/useAuth";
import WarningDeleteUser from "../../modal/WarningDeleteUser";

const UserComponent = ({email, name, surname, age, phone, is_active, is_staff, id, setStatusResponse, setError}) => {
    const [warningDelete, setWarningDelete] = useState(false);
    const {user} = useAuth();
    const blocked = () => {
        try {
            userIsBlocked(id).then(data => {
                if(data){
                    setStatusResponse(true);
                }
            }).catch(err => {
                if(err.response){
                    setError(err.response.data.message);
                }
            });
        } catch (e) {
            setError(e.message);
        }
    }
    const unlocked = () => {
        try {
            userIsUnlocked(id).then(data => {
                if(data){
                    setStatusResponse(true);
                }
            }).catch(err => {
                if(err.response){
                    setError(err.response.data.message);
                }
            });
        } catch (e) {
            setError(e.message);
        }
    }
    const notManager = () => {
        try {
            userIsNotManager(id).then(data => {
                if(data){
                    setStatusResponse(true);
                }
            }).catch(err => {
                if(err.response){
                    setError(err.response.data.message);
                }
            });
        } catch (e) {
            setError(e.message);
        }
    }
    const manager = () => {
        try {
            userManager(id).then(data => {
                if(data){
                    setStatusResponse(true);
                }
            }).catch(err => {
                if(err.response){
                    setError(err.response.data.message);
                }
            });
        } catch (e) {
            setError(e.message);
        }
    }
    return (
        <div className={'blockedAndUnlockedUser_div_map'}>
            <div>Email: {email}</div>
            <div>Name: {name}</div>
            <div>Surname: {surname}</div>
            <div>Age: {age}</div>
            <div>Phone: {phone}</div>
            <div>Active: {is_active ? 'Так' : 'Ні'}</div>
            <div>Manager: {is_staff ? 'Так' : 'Ні'}</div>
            <div>
                <Button
                    variant={'outline-success'}
                    style={{margin: '2px'}}
                    onClick={unlocked}
                >
                    userUnlocked
                </Button>
                <Button
                    variant={'outline-warning'}
                    onClick={blocked}
                    style={{margin: '2px'}}
                >
                    userBlocked
                </Button>
                <Button
                    style={{margin: '2px'}}
                    variant={'outline-danger'}
                    onClick={() => setWarningDelete(true)}
                >
                    delete
                </Button>
                <WarningDeleteUser
                    show={warningDelete}
                    onHide={() => setWarningDelete(false)}
                    setStatusResponse={setStatusResponse}
                    id={id}
                />
                {user.is_superuser && <div style={{marginTop: '5px'}}>
                    <Button
                        style={{margin: '2px'}}
                        variant={'outline-warning'}
                        onClick={notManager}
                    >
                        userNotManager
                    </Button>
                    <Button
                        variant={'outline-success'}
                        style={{margin: '2px'}}
                        onClick={manager}
                    >
                        userManager
                    </Button>
                </div>}
            </div>
        </div>
    );
};

export default UserComponent;