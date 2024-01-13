import AuthenticationController from "../controllers/AuthenticationController.js";

const getUsers = {
    method: "GET",
    url: "/api/users",
    handler: AuthenticationController.getUsers
}

export default [getUsers];
