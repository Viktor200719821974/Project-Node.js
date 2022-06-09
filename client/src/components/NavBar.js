import React from 'react';
import '../style/style.css';
import {Button, Container, Nav, Navbar} from "react-bootstrap";
import {NavLink, useHistory} from "react-router-dom";
import {ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE} from "../utils/constans";
import {observer} from "mobx-react-lite";
import useAuth from "../hook/useAuth";
import {logOutUser} from "../http/userApi";

const NavBar = observer(() => {
    const auth = useAuth();
    const history = useHistory();

    const logOut = async() => {
        auth.logOut();
        await logOutUser();
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
    }

    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <NavLink className={'navBar_navLink'} to={SHOP_ROUTE}>Купи собі техніку</NavLink>
                    {
                        auth.isLogin ?
                            <Nav className="ml-auto" style={{color: "white"}}>
                                {
                                    (auth.user.is_staff || auth.user.is_superuser) &&
                                    <Button
                                        variant={"outline-light"}
                                        onClick={() => history.push(ADMIN_ROUTE)}>
                                        Адмін панель
                                    </Button>
                                }
                                <Button variant={"outline-light"}
                                        style={{marginLeft: 20}}
                                        onClick={() => logOut()}>Вийти</Button>
                            </Nav>
                            :
                            <Nav className="ml-auto" style={{color: "white"}}>
                                <Button variant={"outline-light"} onClick={() => history.push(LOGIN_ROUTE)}>Авторизація</Button>
                            </Nav>
                    }
                </Container>
            </Navbar>
        </div>
    );
});

export default NavBar;