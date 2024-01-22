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

const register = {
    method: "POST",
    url: "/api/register",
    handler: SecurityController.register
}

export default [signIn, checkSignInStatus, signOut, register];