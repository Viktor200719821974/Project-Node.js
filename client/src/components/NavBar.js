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
import {SiTrendmicro} from "react-icons/si";

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
        <div className={'navbar_main_div'}>
            <Navbar bg="primary" variant="dark">
                <Container>
                    <NavLink className={'navBar_navLink'} to={SHOP_ROUTE}><div style={{marginRight: '20px'}}><SiTrendmicro/></div>Купи собі техніку</NavLink>
                    {
                        auth.isLogin ?
                            <Nav className="ml-auto">
                                {
                                    (auth.user.is_staff || auth.user.is_superuser) &&
                                    <Button
                                        variant={"outline-warning"}
                                        onClick={() => history.push(ADMIN_ROUTE)}>
                                        <RiAdminLine/> Адмін панель
                                    </Button>
                                }
                                <Button variant={"outline-warning"}
                                        style={{marginLeft: 20}}
                                        onClick={() => logOut()}><MdOutlineLogout/> Вийти</Button>
                                <div className={'navBar_navLink_div_basket_button'}>
                                    <Button variant={"outline-warning"}
                                        style={{marginLeft: 20}}
                                        onClick={() => history.push(BASKET_ROUTE)}><BsBasket/></Button>
                                    {auth.count > 0 && <div className={'navBar_navLink_div_basket_button_count'}><p className={'navBar_navLink_div_basket_button_count_p'}>{auth.count}</p></div>}
                                </div>
                            </Nav>
                            :
                            <Nav className="ml-auto" style={{color: "white"}}>
                                <Button variant={"outline-warning"} onClick={() => history.push(LOGIN_ROUTE)}><CgLogIn/> Авторизація</Button>
                            </Nav>
                    }
                </Container>
            </Navbar>
        </div>
    );
});

export default NavBar;