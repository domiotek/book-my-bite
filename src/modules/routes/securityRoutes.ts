import SecurityController from "../controllers/SecurityController.js";


const signIn = {
    method: "POST",
    url: "/api/signin",
    handler: SecurityController.signInUser
}

const getPasswd = {
    method: "POST",
    url: "/api/genPassword",
    handler: SecurityController.generatePassword
}


export default [signIn, getPasswd];