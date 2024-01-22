import SecurityController from "../controllers/SecurityController.js";


const signIn = {
    method: "POST",
    url: "/api/signin",
    handler: SecurityController.signInUser
}

const checkSignInStatus = {
    method: "GET",
    url: "/api/checkSignInStatus",
    handler: SecurityController.checkSignInStatus
}

const signOut = {
    method: "GET",
    url: "/api/signout",
    handler: SecurityController.signOutUser
}

const signUp = {
    method: "POST",
    url: "/api/signup",
    handler: SecurityController.signUpUser
}

export default [signIn, checkSignInStatus, signOut, signUp];