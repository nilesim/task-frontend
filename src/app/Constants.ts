
const baseUrl = "http://localhost:3000";
const ApiUrl = {
    login: `${baseUrl}/authenticate`
};

const Routes = {
    signIn: {
        text: "Sign In",
        path: "/sign-in"
    },
    signOut: {
        text: "Sign Out",
        path : "/sign-in"    
    },
    home : {
        text: "Home",
        path: "/home"
    }
} as const;



export default {
    ApiUrl,
    Routes
};