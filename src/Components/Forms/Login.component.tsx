import React, { useState } from "react";
//import Auth from '../../auth/Auth'
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../app/store";
import { AuthActions } from "../../auth/authSlice";
import AlertDialogSlide from "../Modals/SlideDialog";

type LoginProps = {
};

const Login: React.FC<LoginProps> = props => {
    const state = useSelector((rootState: RootState) => rootState.auth);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();

    const onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setPassword(value);
    };

    const onUserNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setUsername(value);
    };

    const onLogin = () => {
        AuthActions.loginAsync(dispatch, { username, password });
    };

    const handleClose = () => {
        dispatch(AuthActions.hideError());
    };

    return (
        <React.Fragment>
        <form >
            <h3>Sign In</h3>

            <div className="form-group">
                <label>User name</label>
                <input type="text" className="form-control" value={username} onChange={onUserNameChange} placeholder="User name" />
            </div>

            <div className="form-group">
                <label>Password</label>
                <input type="password" className="form-control" value={password} onChange={onPasswordChange} placeholder="Enter password" />
            </div>

            <div className="form-group">
                <div className="custom-control custom-checkbox">
                    <input type="checkbox" className="custom-control-input" id="customCheck1" />
                    <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                </div>
            </div>

            <button type="button" className="btn btn-primary btn-block" disabled={state.isLoading} onClick={onLogin} >Submit</button>
            
        </form>
        <AlertDialogSlide title="Hata" message={state.error} open={state.showError} handleClose={handleClose} ></AlertDialogSlide>
        </React.Fragment>
    );
}

export default Login;