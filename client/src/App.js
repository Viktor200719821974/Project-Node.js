import React, {useEffect, useState} from "react";
import {BrowserRouter} from "react-router-dom";
import {Spinner} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import NavBar from "./components/NavBar";
// import {Context} from "./index";
import {check} from "./http/userApi";
import AppRouter from "./components/AppRouter";
import useAuth from "./hook/useAuth";


const App = observer(() => {
    const auth = useAuth();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        try{
        check().then(data => {
                auth.isLogin = true;
                console.log(data);
        })
        }catch (e) {
            console.log(e.message);
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
