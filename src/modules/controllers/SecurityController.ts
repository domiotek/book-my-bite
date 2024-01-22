import { FastifyReply, FastifyRequest } from "fastify";
import {hash, compare} from "bcrypt";
import SessionRepository from "../repositories/SessionRepository.js";
import { SignInEndpoint, SignUpEndpoint } from "../../public/types/api";
import UserRepository from "../repositories/UserRepository.js";
import { randomBytes } from "crypto";
import Session from "../models/Session.js";
import { DateTime } from "luxon";


export default class SecurityController {
    public static readonly sessionRepository = new SessionRepository();
    public static readonly userRepository = new UserRepository();

    public static async verifyUserSession(sessionID: string) {
        const sessionRepo = SecurityController.sessionRepository;

        const session = await sessionRepo.getSessionByID(sessionID);

        if(session) {
            if(session.isValid()) return true;
            else sessionRepo.deleteSession(session.getID());
        }

        return false;
    }

    public static async signInUser(req: FastifyRequest, res: FastifyReply) {
        const sessionID = req.cookies["session"];

        let result: SignInEndpoint.IResponse = {
            status: "Failure",
            errCode: "UserSignedIn"
        }
		res.status(400);

        if(sessionID && await SecurityController.verifyUserSession(sessionID)) {
            return result;
        }

        result.errCode = "InvalidCredentials";

        const data = req.body as SignInEndpoint.IRequest;
        const user = await SecurityController.userRepository.getUserByEmail(data.email ?? "");

        if(user) {
            const passwordCheck = await compare(data.password ?? "", user.getPassword());
            if(passwordCheck) {
                const sessionID = randomBytes(16).toString("hex");
                const expirationDate = DateTime.now().plus({day: 7});
                const session = new Session(sessionID, user, expirationDate);

                const dbResult = await SecurityController.sessionRepository.createSession(session);

                if(dbResult) {
					res.status(200);
                    res.setCookie("session",sessionID,{path:"/",expires: expirationDate.toJSDate()});
                    result = {status: "Success", data: undefined};
                    return result;
                }else result.errCode="InternalError";
            }
        }

        return result;
    }

    public static async signUpUser(req: FastifyRequest, res: FastifyReply) {

        let result: SignUpEndpoint.IResponse = {
            status: "Failure",
            errCode: "BadRequest"
        }

        res.status(400);

        const data = req.body as SignUpEndpoint.IBody;

        if(!data.email || !data.password || !data.name || !data.surname || !data.phone) {
            result.message = "Missing at least one of required parameters (email, password, name, surname, phone)";

            return result;
        }

        if(!(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/).test(data.email)) {
            result.message = "Invalid email";

            return result;
        }

        const sessionID = req.cookies["session"];

        if(sessionID && await SecurityController.verifyUserSession(sessionID)) {
            result.errCode = "UserSignedIn";
            return result;
        }

        const userByEmail = await SecurityController.userRepository.getUserByEmail(data.email);
        const userByPhone = await SecurityController.userRepository.getUserByPhone(data.phone);

        if(userByEmail||userByPhone) {
            result.errCode = "UserExists";
            return result;
        }



        const hashedPassword = await hash(data.password, 10);

        const repoResult = await SecurityController.userRepository.createUser(data.email, hashedPassword, data.name, data.surname, data.phone);

        if(repoResult) {
            res.status(201);
            result = {
                status: "Success",
                data: undefined
            }
        }else result.errCode = "InternalError";

        return result;
    }

    public static async checkSignInStatus(req: FastifyRequest) {
        return {
            status: "Success",
            data: await SecurityController.verifyUserSession(req.cookies["session"] ?? "")
        }
    }

    public static async signOutUser(req: FastifyRequest, res: FastifyReply) {
        const sessionID = req.cookies["session"];

        if(sessionID) {
            SecurityController.sessionRepository.deleteSession(sessionID ?? "");
        }

        res.redirect("/Home");
    }
}