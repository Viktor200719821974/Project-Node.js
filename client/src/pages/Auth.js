import React, {useContext, useState} from 'react';
import {Button, Card, Container, Form, Row} from "react-bootstrap";
import {LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE} from "../utils/constans";
import {NavLink, useHistory, useLocation} from "react-router-dom";
import {Context} from "../index";
import {login, registration} from "../http/userApi";
import {observer} from "mobx-react-lite";

const Auth = observer(() => {
    const {user} = useContext(Context);
    const location = useLocation();
    const history = useHistory();
    const isLogin = location.pathname === LOGIN_ROUTE;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const click = async () => {
        try {
            let data;
            if (isLogin) {
                data = await login(email, password);
            } else {
                data = await registration(email, password);
                console.log(data);
            }
            user.setUser(user);
            user.setIsAuth(true);
            history.push(SHOP_ROUTE);
        } catch (e) {
            alert(e.response.data.message)
        }
    }
    return (
        <Container
            className={"d-flex justify-content-center align-items-center"}
                   style={{height: window.innerHeight - 54}}>

            <Card style={{width: 600}} className="p-5">
                <h2 className={"m-auto"}>{isLogin ? 'Авторизація' : "Реєстрація"}</h2>
                <Form className={"d-flex flex-column"}>
                    <Form.Control
                        className={"mt-3"}
                        placeholder="Введіть ваш email..."
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <Form.Control
                        className={"mt-3"}
                        placeholder="Введіть ваше гасло..."
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                    />
                    <Row className={"d-flex justify-content-between mt-3 pl-3 pr-3"}>
                        {isLogin ?
                            <div>
                                Немає акаунта? <NavLink to={REGISTRATION_ROUTE}>Зареєструйся!</NavLink>
                            </div>
                            :
                            <div>
                                Є акаунт? <NavLink to={LOGIN_ROUTE}>Увійти!</NavLink>
                            </div>
                        }
                        <Button
                            style={{marginTop: 10}}
                            variant={"outline-success"}
                            onClick={click}
                        >
                            {isLogin ? 'Увійти' : 'Реєстрація'}
                        </Button>
                    </Row>

                </Form>
            </Card>
        </Container>
    );
});

export default Auth;