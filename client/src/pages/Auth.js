import React, {useState} from 'react';
import {Button, Card, Container, Form, Row} from "react-bootstrap";
import {LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE} from "../utils/constans";
import {NavLink, useHistory, useLocation} from "react-router-dom";
import { login, registration} from "../http/authApi";
import {observer} from "mobx-react-lite";
import useAuth from "../hook/useAuth";

const Auth = observer(() => {
    const auth = useAuth();
    const location = useLocation();
    const history = useHistory();
    const isLogin = location.pathname === LOGIN_ROUTE;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [phone, setPhone] = useState('');
    const [age, setAge] = useState('');

    const click = async () => {
        try {
            let data;
            if (isLogin) {
                data = await login(email, password);
            } else {
               const res = await registration(email, password, name, surname, age, phone);
               if (res){
                   history.push(SHOP_ROUTE);
               }
            }
            if (data) {
                auth.setIsAuth(data.accessToken);
                history.push(SHOP_ROUTE);
            }
        } catch (e) {
            alert(e.response.data.message);
            console.log(e);
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
                    {!isLogin &&
                        <Form.Control
                            className={"mt-3"}
                            placeholder="Введіть ваше ім'я..."
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                    }
                    {!isLogin &&
                        <Form.Control
                            className={"mt-3"}
                            placeholder="Введіть ваше прізвище..."
                            value={surname}
                            onChange={e => setSurname(e.target.value)}
                        />
                    }
                    {!isLogin &&
                        <Form.Control
                            className={"mt-3"}
                            placeholder="Введіть ваш вік..."
                            value={age}
                            onChange={e => setAge(e.target.value)}
                        />
                    }
                    {!isLogin &&
                        <Form.Control
                            className={"mt-3"}
                            placeholder="Введіть ваш телефон..."
                            value={phone}
                            onChange={e => setPhone(e.target.value)}
                        />
                    }
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