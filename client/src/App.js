import React, {useEffect, useState} from "react";
import {BrowserRouter, useHistory} from "react-router-dom";
import {Spinner} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import NavBar from "./components/NavBar";
import AppRouter from "./components/AppRouter";
import useAuth from "./hook/useAuth";
import {LOGIN_ROUTE} from "./utils/constans";

const App = observer(() => {
    const [loading, setLoading] = useState(true);
    const auth = useAuth();
    const history = useHistory();
    useEffect (() => {
        try{
            const accessToken = localStorage.getItem('accessToken');
            if (accessToken){
                auth.setIsAuth(accessToken);
            }
        }catch (e) {
            if (e) {
                history.push(LOGIN_ROUTE);
            }
            console.log(e);
        }
        setLoading(false);
    },[]);
    if (loading){
        return <Spinner animation={"grow"}/>
    }
  return (
    <BrowserRouter >
       <NavBar/>
      <AppRouter/>
    </BrowserRouter>
  );
});

export default App;
