import React from 'react';
import {Switch, Route, Redirect} from "react-router-dom";
import {authRoutes, publicRoutes} from "../routes";
import Shop from "../pages/Shop";
import useAuth from "../hook/useAuth";

const AppRouter = () => {
    const auth = useAuth();
    return (
        <Switch>
            {auth.isAuth && authRoutes.map(({path, Component}) =>
                <Route key={path} path={path} component={Component} exact/>
            )}
            {publicRoutes.map(({path, Component}) =>
                <Route key={path} path={path} component={Component} exact/>
            )}
            <Redirect to={Shop}/>
        </Switch>
    );
};

export default AppRouter;