import React from 'react';
import {Button, Container, Nav, Navbar} from "react-bootstrap";
import {NavLink, useHistory} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {CgLogIn} from 'react-icons/cg';
import {MdOutlineLogout} from 'react-icons/md';
import {RiAdminLine} from 'react-icons/ri';
import {BsBasket} from 'react-icons/bs';
import {ADMIN_ROUTE, BASKET_ROUTE, LOGIN_ROUTE, SHOP_ROUTE} from "../utils/constans";
import '../style/style.css';
import useAuth from "../hook/useAuth";
import {logOutUser} from "../http/authApi";

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
                                        <RiAdminLine/> Адмін панель
                                    </Button>
                                }
                                <Button variant={"outline-light"}
                                        style={{marginLeft: 20}}
                                        onClick={() => logOut()}><MdOutlineLogout/></Button>
                                <div className={'navBar_navLink_div_basket_button'}>
                                    <Button variant={"outline-light"}
                                        style={{marginLeft: 20}}
                                        onClick={() => history.push(BASKET_ROUTE)}><BsBasket/></Button>
                                    {auth.count !== 0 && <div className={'navBar_navLink_div_basket_button_count'}>{auth.count}</div>}
                                </div>
                            </Nav>
                            :
                            <Nav className="ml-auto" style={{color: "white"}}>
                                <Button variant={"outline-light"} onClick={() => history.push(LOGIN_ROUTE)}><CgLogIn/></Button>
                            </Nav>
                    }
                </Container>
            </Navbar>
        </div>
    );
});

export default NavBar;