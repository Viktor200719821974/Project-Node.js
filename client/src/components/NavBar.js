import React, {useContext} from 'react';
import {Context} from "../index";
import {Button, Container, Nav, Navbar} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import {SHOP_ROUTE} from "../utils/constans";
import {observer} from "mobx-react-lite";

const NavBar = observer(() => {
    const {user} = useContext(Context);
    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <NavLink style={{color: "white"}} to={SHOP_ROUTE}>Купи собі техніку</NavLink>
                    {
                        user.isAuth ?
                            <Nav className="ml-auto" style={{color: "white"}}>
                                <Button variant={"outline-light"}>Адмін панель</Button>
                                <Button variant={"outline-light"} style={{marginLeft: 20}}>Вийти</Button>
                            </Nav>
                            :
                            <Nav className="ml-auto" style={{color: "white"}}>
                                <Button variant={"outline-light"} onClick={() => user.setIsAuth(true)}>Авторизація</Button>
                            </Nav>
                    }
                </Container>
            </Navbar>
        </div>
    );
});

export default NavBar;