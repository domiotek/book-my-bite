import User from "../models/User.js";
import Session from "../models/Session.js";
import UserRepository from "./UserRepository.js";
import { DateTime } from "luxon";
import Output from "../Output.js";


export default class SessionRepository {

    public async getSessionByID(id: string) {
        const result = await global.app.orm.session.findUnique({
            where: {
                session_id: id
            }
        });

        if (!result) return null;

        const userRepo = new UserRepository();
        const user = await userRepo.getUserByID(result.user_id);

        if(!user) return null;

        return new Session(result.session_id, user, DateTime.fromJSDate(result.validUntil));
    }

    public async getUserSessions(user: User) {
        const sessionsData = await global.app.orm.session.findMany({
            where: {
                user_id: user.getID()
            }
        })

        const sessionsResult = [];

        for (const record of sessionsData) {

            const session = new Session(record.session_id, user, DateTime.fromJSDate(record.validUntil));
            sessionsResult.push(session);
        }

        return sessionsResult;
    }

    public async createSession(session: Session) {
        try {
            await global.app.orm.session.create({
                data: {
                    session_id: session.getID(),
                    user_id: session.getUser().getID(),
                    validUntil: session.getValidUntil().toJSDate()
                }
            });
        } catch (error: any) {
            Output.init().bg("red").fg("white").print(`[Error] Couldn't create session. ${error.message}`)
            return false;
        }

        return true;
    }

    public async updateSession(session: Session) {
        try {
            await global.app.orm.session.update({
                data: {
                    validUntil: session.getValidUntil().toJSDate()
                },
                where: {
                    session_id: session.getID()
                }
            });
        } catch (error: any) {
            Output.init().bg("red").fg("white").print(`[Error] Couldn't update session. ${error.message}`)
            return false;
        }

        return true;
    }

    public async deleteSession(sessionID: string) {

        try {
            await global.app.orm.session.delete({
                where: {
                    session_id: sessionID
                }
            });
    
        }catch (error: any) {
            Output.init().bg("red").fg("white").print(`[Error] Couldn't delete session. ${error.message}`)
            return false;
        }
    
        return true;
    }
}