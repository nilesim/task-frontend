import React from "react";
import { Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { useHistory, RouteProps } from "react-router";
import Constants from "../../app/Constants";

const ProtectedRoute : React.FC<RouteProps> = props => {
    const state = useSelector((rootState: RootState) => rootState.auth);
    const isLoggedIn = state.user.username;
    const history = useHistory();

    if (!isLoggedIn) {
        history.push(Constants.Routes.signIn.path);
        return <React.Fragment></React.Fragment>;
    }

    return (
    <Route {...props}>
              {props.children}
    </Route>);
};

export default ProtectedRoute;