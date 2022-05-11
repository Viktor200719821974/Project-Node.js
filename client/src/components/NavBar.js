import React, {useContext} from 'react';
import {Context} from "../index";
import {Button, Container, Nav, Navbar} from "react-bootstrap";
import {NavLink, useHistory} from "react-router-dom";
import {ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE} from "../utils/constans";
import {observer} from "mobx-react-lite";

const NavBar = observer(() => {
    const {user} = useContext(Context);
    const history = useHistory();
    const logOut = () => {
        user.setUser({});
        user.setIsAuth(false);
        localStorage.removeItem('token');
    }
    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <NavLink style={{color: "white"}} to={SHOP_ROUTE}>Купи собі техніку</NavLink>
                    {
                        user.isAuth ?
                            <Nav className="ml-auto" style={{color: "white"}}>
                                <Button variant={"outline-light"}
                                        onClick={() => history.push(ADMIN_ROUTE)}>Адмін панель</Button>
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