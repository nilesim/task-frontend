import { createSlice, PayloadAction, Dispatch } from "@reduxjs/toolkit";
import { setToken, getToken, getUserFromStorage } from "./tokenHelper";
import Axios from "axios";
import Constants from "../app/Constants";


export type User = {
  username: string;
  displayName: string;
  avatar?: string;
  group?: string;

};

const userFromStorage = getUserFromStorage();
console.log(userFromStorage);
const defaultUser: User = userFromStorage || { displayName: "", username: "" };

type UserState = {
  user: User;
  isLoading: boolean;
  error: string;
  showError: boolean;
};

type AuthResponse = {
  user: User;
  token: string;
  error: string;
};

const initialState: UserState = {
  user: defaultUser,
  isLoading: false,
  error: "",
  showError: false
};

const authSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    login(state) {
      state.isLoading = true;
    },
    authSuccess: (state, action: PayloadAction<AuthResponse>) => {
      const response = action.payload;
      if (response.error) {
        state.error = response.error;
        
      } else {
        state.user = response.user;
        setToken(response.token);

      }

      state.isLoading = false;
    },
    authError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
      state.showError = true;
    },
    hideError: (state) => {
      state.showError=false;
    },
    logout(state) {
      state.user = { displayName: "", username: "" };
      state.error = "";
      state.isLoading = false;
      setToken("");
    }
  },
});

 type LoginPayload = {
  username: string; 
  password: string;
};

export const AuthActions = {
  ...authSlice.actions,
  async loginAsync(dispatch: Dispatch, payload: LoginPayload) {
    dispatch(AuthActions.login());
    try {
      const response = await Axios.post<AuthResponse>(Constants.ApiUrl.login, payload);
      
      if (response.status === 200) {
        dispatch(AuthActions.authSuccess(response.data));
      } else {
        debugger;
        dispatch(AuthActions.authError(response.data.error));
      }
    }
    catch (err) {
      dispatch(AuthActions.authError(err.toString()));
    }
  }
};

export default authSlice.reducer;


