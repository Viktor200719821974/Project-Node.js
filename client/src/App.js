import React, {useEffect, useState} from "react";
import {BrowserRouter, useHistory} from "react-router-dom";
import {Spinner} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import NavBar from "./components/NavBar";
import {check, fetchRefresh} from "./http/userApi";
import AppRouter from "./components/AppRouter";
import useAuth from "./hook/useAuth";
// import {LOGIN_ROUTE} from "./utils/constans";

const App = observer(() => {
    const auth = useAuth();
    // const history = useHistory();
    const [loading, setLoading] = useState(true);
    useEffect (() => {
        try{
            const fetchData = async () => {
                if (localStorage.getItem('accessToken')) {
                    await check().then(data => {
                        if (data.user){
                            auth.setIsAuth(data);
                        }
                        // if (!data.email){
                        //     fetchRefresh().then(data => {
                        //         if (data.request.status === 200){
                        //             localStorage.setItem('accessToken', data.data.accessToken);
                        //             localStorage.setItem('refreshToken', data.data.refreshToken);
                        //             auth.setIsAuth(data.data.user);
                        //         }else {
                        //             history.push(LOGIN_ROUTE);
                        //         }
                        //     });
                        // }else {
                        //     auth.setIsAuth(data);
                        //     console.log(data);
                        // }
                    });
                }
            }
            fetchData();
        }catch (e) {
            console.log(e);
            return Promise.reject(e);
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
