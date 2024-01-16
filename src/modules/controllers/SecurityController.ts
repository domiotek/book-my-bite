import { FastifyReply, FastifyRequest } from "fastify";
import {hash, compare} from "bcrypt";
import SessionRepository from "../repositories/SessionRepository.js";
import { SignInEndpoint } from "../../public/types/api";
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
            errCode: "AlreadySignedIn"
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
                }else result.errCode="DBError";
            }
        }

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

    public static async generatePassword(req: FastifyRequest, res: FastifyReply) {
        const data = req.body as any;
        const hashedPasswd = await hash(data["password"] ?? "",10);
        return {
            status: "Success",
			data: hashedPasswd
        }
    }
}