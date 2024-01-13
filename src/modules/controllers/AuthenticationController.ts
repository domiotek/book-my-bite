import { FastifyReply, FastifyRequest } from "fastify";

export default class AuthenticationController {

    public static getUsers(req: FastifyRequest, res: FastifyReply) {
        return {result: "Success"};
    }
}