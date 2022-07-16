import React, {useEffect, useState} from 'react';
import {getUsers} from "../http/userApi";
import {Alert, Form} from "react-bootstrap";
import UserComponent from "../components/user/UserComponent";
import Pagination from "react-bootstrap/Pagination";
import PaginationDevice from "../components/Pagination";

const BlockedAndUnblockedUser = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');
    const [statusResponse, setStatusResponse] = useState(false);
    const [page, setPage] = useState(1);
    const [countPage, setCountPage] = useState();
    const [email, setEmail] = useState('');

    let numberPage = [];
    for (let i = 1; i <= countPage; i++ ){
        Number(i);
        numberPage.push(i);
    }

    useEffect(() => {
        try {
            getUsers(page, email).then(data => {
                if (data.rows){
                    setUsers(data.rows);
                    setError('');
                }
                if (data.count && data.perPage){
                    Number(data.count);
                    Number(data.perPage);
                    setCountPage(Math.ceil(data.count/ data.perPage));
                }
                if (countPage && countPage < page) {
                    setPage(1);
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
    },[statusResponse, page, countPage, email]);
    return (
        <>
            {error && <Alert variant={'danger'} style={{textAlign: 'center', fontSize: '20px'}}>{error}</Alert>}
            <div style={{width: '300px'}}>
                <Form className={'d-flex p-2'}>
                    <Form.Control
                        type="text"
                        placeholder={"Введіть email..."}
                        onChange={(e) => setEmail(e.target.value)}/>
                </Form>
            </div>
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
            {
                countPage > 1 && <div className={'shop_div_paginationDevice'}>
                    <Pagination>
                        {page !== 1 && <Pagination.First onClick={() => {
                            setPage(1)
                        }}/>}
                        {page !== 1 && <Pagination.Prev onClick={() => {
                            setPage(page - 1)
                        }}/>}
                        {numberPage && numberPage.map((c, index) =>
                            <PaginationDevice
                                key={index}
                                item={c}
                                setPage={setPage}
                                page={page}/>
                        )}
                        {countPage !== page && <Pagination.Next onClick={() => {
                            setPage(page + 1)
                        }}/>}
                        {countPage !== page && <Pagination.Last onClick={() => {
                            setPage(countPage)
                        }}/>}
                    </Pagination>
                </div>
            }
        </>
    );
};

export default BlockedAndUnblockedUser;