import { User } from "./authSlice";
import jwtDecode from "jwt-decode";

const key = "radarToken";
export function getToken() {
    return localStorage.getItem(key);
}

export function setToken(value: string) {
    if (value) {
        localStorage.setItem(key, value);
    }else {
        localStorage.removeItem(key);
    }
    
}

export function getUserFromStorage() {
    try {
        const val = getToken();

        if (val) {
            
            const decodedToken = jwtDecode(val);
            return  decodedToken as User;
        }
    }
    catch(e) {

    }

    return undefined;

}